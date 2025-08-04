import logo from '../assets/logog.png';

export default function Header() {
  return (
    <>
      <div className="bg-[#008d4c] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]">
        <img src={logo} alt="Logo" className="w-90 h-90" />
        <h1>Bem vindo(a), João</h1>
      </div>
    </>
  );
}
