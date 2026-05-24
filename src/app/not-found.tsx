import Link from "next/link";
import Image from "next/image";
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <Image
          src="/images/logo.png"
          alt="Brian James Concillo"
          width={72}
          height={72}
          className="notfound__mark"
        />
        <h1 className="notfound__code">404</h1>
        <p className="notfound__msg">
          That page doesn't exist — or hasn't been built yet.
        </p>
        <Link href="/" className="notfound__cta">
          Back to home
        </Link>
      </div>
    </main>
  );
}
