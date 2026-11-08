'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="document-page">
      <div className="container">
        <h1>Vamos tentar de novo.</h1>
        <p>Não foi possível carregar esta parte da experiência.</p>
        <button className="button" onClick={reset}>
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
