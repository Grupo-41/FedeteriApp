import styles from "./page.module.css";
import Image from "next/image";
import Logo from '../public/Fedeteria_Horizontal.png'

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-center flex-column">
        <Image width={900} src={Logo} />
        <h4 className="mt-5 text-center">Work in progress...</h4>
      </div>
    </>
  );
}
