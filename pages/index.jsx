import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Configurator from "../components/Configurator";
import Land from "../components/Land";
import { useState } from "react";
import { useContext } from "react";
import { state } from "./state";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isActive } = useContext(state);
  return (
    <>
      <Head>
        <title>Shirt Configurator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{isActive ? <Configurator /> : <Land />}</main>
    </>
  );
}
