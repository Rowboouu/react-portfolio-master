/**
 * Deliberately minimal markdown renderer for assistant messages.
 *
 * Covers only what the agent is prompted to emit — paragraphs, bullet and
 * numbered lists, bold, italics, inline code and links. Builds React elements
 * rather than an HTML string, so model output can never inject markup.
 */

import { Fragment, type ReactNode } from "react";

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(`[^`]+`)|(\[[^\]]+\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<>()]+)/g;

const renderInline = (text: string, keyPrefix: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-i${index++}`;
    const [token] = match;

    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const label = token.slice(1, token.indexOf("]"));
      nodes.push(
        <a key={key} href={match[5]} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      );
    } else if (token.startsWith("http")) {
      nodes.push(
        <a key={key} href={token} target="_blank" rel="noopener noreferrer">
          {token.replace(/^https?:\/\//, "")}
        </a>,
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};

type Block =
  | { kind: "p"; lines: string[] }
  | { kind: "ul" | "ol"; items: string[] };

const toBlocks = (source: string): Block[] => {
  const blocks: Block[] = [];

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trimEnd();
    const previous = blocks[blocks.length - 1];

    if (!line.trim()) {
      // Blank line ends whatever block was open.
      if (previous) blocks.push({ kind: "p", lines: [] });
      continue;
    }

    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (bullet) {
      if (previous?.kind === "ul") previous.items.push(bullet[1]);
      else blocks.push({ kind: "ul", items: [bullet[1]] });
      continue;
    }

    if (numbered) {
      if (previous?.kind === "ol") previous.items.push(numbered[1]);
      else blocks.push({ kind: "ol", items: [numbered[1]] });
      continue;
    }

    // Headings would be oversized inside a chat bubble — flatten to bold text.
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    const content = heading ? `**${heading[1]}**` : line;

    // An open paragraph continues; a list or a blank-line separator starts a
    // fresh one (the separator is an empty `p`, so appending to it is correct).
    if (previous?.kind === "p") previous.lines.push(content);
    else blocks.push({ kind: "p", lines: [content] });
  }

  return blocks.filter(
    (block) =>
      (block.kind === "p" && block.lines.length > 0) ||
      (block.kind !== "p" && block.items.length > 0),
  );
};

export const Markdown = ({ text }: { text: string }) => (
  <>
    {toBlocks(text).map((block, blockIndex) => {
      if (block.kind === "p") {
        return (
          <p key={blockIndex}>
            {block.lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {renderInline(line, `${blockIndex}-${lineIndex}`)}
              </Fragment>
            ))}
          </p>
        );
      }

      const List = block.kind === "ul" ? "ul" : "ol";
      return (
        <List key={blockIndex}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderInline(item, `${blockIndex}-${itemIndex}`)}
            </li>
          ))}
        </List>
      );
    })}
  </>
);
