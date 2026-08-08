"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { FaCommentDots, FaPaperPlane, FaTimes, FaRedo } from "react-icons/fa";
import { Markdown } from "./markdown";
import "./style.css";

type Role = "user" | "assistant";
type ChatMessage = { id: string; role: Role; content: string };

const STORAGE_KEY = "portfolio:chat";
const MAX_INPUT = 2000;

const GREETING =
  "Hi! I'm Brian's assistant. Ask me about his work, skills or projects — or tell me you'd like to book a meeting and I'll pass the details along to him.";

const SUGGESTIONS = [
  "What does Brian do?",
  "Tell me about his projects",
  "What's his tech stack?",
  "I'd like to book a meeting",
];

let idCounter = 0;
const nextId = () => `m${Date.now().toString(36)}-${idCounter++}`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [toolRunning, setToolRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /** Restore the transcript so opening and closing the panel is not destructive. */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored) as ChatMessage[]);
    } catch {
      // Corrupt or unavailable storage just means starting fresh.
    }
  }, []);

  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Non-fatal: persistence is a convenience, not a requirement.
    }
  }, [messages]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, streaming, toolRunning]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /** Abandon any in-flight request when the widget unmounts. */
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (rawText: string) => {
      const text = rawText.trim().slice(0, MAX_INPUT);
      if (!text || streaming) return;

      setError(null);
      setInput("");

      const history = [
        ...messages,
        { id: nextId(), role: "user" as Role, content: text },
      ];
      const replyId = nextId();

      setMessages([...history, { id: replyId, role: "assistant", content: "" }]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const appendToReply = (chunk: string) =>
        setMessages((current) =>
          current.map((message) =>
            message.id === replyId
              ? { ...message, content: message.content + chunk }
              : message,
          ),
        );

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!response.ok || !response.body) {
          const detail = await response
            .json()
            .then((body) => (body as { error?: string }).error)
            .catch(() => undefined);
          throw new Error(detail ?? "The assistant is unavailable right now.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let streamError: string | null = null;

        // Newline-delimited JSON: buffer until a newline, since a chunk can
        // split an event in half or carry several at once.
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;

            let event: Record<string, unknown>;
            try {
              event = JSON.parse(line);
            } catch {
              continue;
            }

            if (event.type === "text" && typeof event.value === "string") {
              appendToReply(event.value);
            } else if (event.type === "tool") {
              setToolRunning(event.status === "running");
            } else if (event.type === "error") {
              streamError =
                typeof event.message === "string"
                  ? event.message
                  : "Something went wrong.";
            }
          }
        }

        if (streamError) throw new Error(streamError);

        // A stream that produced no prose still needs to say something.
        setMessages((current) =>
          current.map((message) =>
            message.id === replyId && !message.content
              ? {
                  ...message,
                  content:
                    "Sorry, I didn't manage a reply there. Could you rephrase?",
                }
              : message,
          ),
        );
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;

        setError(
          caught instanceof Error
            ? caught.message
            : "The assistant is unavailable right now.",
        );
        // Drop the empty placeholder so the transcript has no blank bubble.
        setMessages((current) =>
          current.filter(
            (message) => !(message.id === replyId && !message.content),
          ),
        );
      } finally {
        setToolRunning(false);
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
    setToolRunning(false);
    setError(null);
    setMessages([]);
  };

  const lastMessage = messages[messages.length - 1];
  const awaitingFirstToken =
    streaming && lastMessage?.role === "assistant" && !lastMessage.content;

  const showSuggestions = messages.length === 0;

  return (
    <>
      <button
        type="button"
        className={`chatbot__toggle${open ? " chatbot__toggle--open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? <FaTimes /> : <FaCommentDots />}
        {!open && <span className="chatbot__toggle-pulse" aria-hidden />}
      </button>

      <div
        className={`chatbot__panel${open ? " chatbot__panel--open" : ""}`}
        role="dialog"
        aria-label="Chat with Brian's assistant"
        aria-modal="false"
        aria-hidden={!open}
      >
        <header className="chatbot__header">
          <div className="chatbot__header-text">
            <span className="chatbot__header-title">Ask about Brian</span>
            <span className="chatbot__header-subtitle">
              Questions &amp; meeting requests
            </span>
          </div>
          <div className="chatbot__header-actions">
            {messages.length > 0 && (
              <button
                type="button"
                className="chatbot__icon-btn"
                onClick={reset}
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <FaRedo />
              </button>
            )}
            <button
              type="button"
              className="chatbot__icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </header>

        <div className="chatbot__body" ref={scrollRef}>
          <div className="chatbot__message chatbot__message--assistant">
            <div className="chatbot__bubble">
              <p>{GREETING}</p>
            </div>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot__message chatbot__message--${message.role}`}
            >
              <div className="chatbot__bubble">
                {message.role === "assistant" ? (
                  <Markdown text={message.content} />
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}

          {toolRunning && (
            <div className="chatbot__status">
              Sending your request to Brian&hellip;
            </div>
          )}

          {awaitingFirstToken && !toolRunning && (
            <div className="chatbot__message chatbot__message--assistant">
              <div className="chatbot__bubble chatbot__bubble--typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {error && (
            <div className="chatbot__error" role="alert">
              {error}
            </div>
          )}

          {showSuggestions && (
            <div className="chatbot__suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chatbot__suggestion"
                  onClick={() => void send(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chatbot__composer" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            className="chatbot__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Ask a question, or book a meeting…"
            rows={1}
            maxLength={MAX_INPUT}
            aria-label="Message"
            disabled={streaming}
          />
          <button
            type="submit"
            className="chatbot__send"
            disabled={streaming || !input.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
