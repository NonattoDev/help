export async function ManutencaoButton() {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">Manutenção</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <a>Cadastro Professor</a>
        </li>
        <li>
          <a>Cadastro Aluno</a>
        </li>
      </ul>
    </details>
  );
}
