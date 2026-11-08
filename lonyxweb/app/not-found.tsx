import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="document-page not-found">
      <div className="container">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          404 / FORA DA ROTA
        </p>
        <h1>
          Vamos encontrar
          <br />o próximo caminho.
        </h1>
        <p>Esta página não foi encontrada.</p>
        <Link href="/" className="button">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
