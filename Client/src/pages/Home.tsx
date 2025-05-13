import { roleStore } from "@/store/roleStore";
import useAuth from "@/hooks/useAuth";
import asterisk from "/user/Asterisk.png";
import asterisk2 from "/user/Asterisk2.png";
import asterisk3 from "/user/Asterisk3.png";
import slogan from "/user/slogan.png";
import arrow from "/user/arrow.png";
import person1 from "/user/person1.png";
import person2 from "/user/person2.png";
import person3 from "/user/person3.png";
import person4 from "/user/person4.png";
import { Icon } from "@iconify/react";
import vendorDasbor from "/user/vendorDasbor.png";
import top1 from "/user/top1.png";
import top2 from "/user/top2.png";
import top3 from "/user/top3.png";
import top4 from "/user/top4.png";
import top5 from "/user/top5.png";
import top6 from "/user/top6.png";
import arrow2 from "/user/arrow2.png";
import seller from "/user/seller-testimony.png";
import student from "/user/student-testimony.png";
import NavbarMain from "@/components/general/NavbarMain";
import { Link } from "react-router-dom";

export default function Home() {
  const { role } = roleStore();
  const { logout } = useAuth();

  return (
    <div className="bg-background min-h-screen">
      <div>{role ? role : "null"}</div>
      <button onClick={logout}>logout</button>
      <NavbarMain />
      <div className="flex flex-col items-center w-[80%] mx-auto gap-2 py-14 lg:py-28">
        <div className="flex items-center gap-4 lg:gap-6">
          <img src={asterisk} alt="" className="w-10 h-10 lg:w-16 lg:h-16" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
            ZERO
          </h1>
          <img src={slogan} alt="" className="h-12 hidden md:block lg:h-16" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 lg:gap-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
            WASTING
          </h1>
          <div className="flex items-center gap-4 md:gap-6 lg:gap-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
              TIME
            </h1>
            <img src={arrow} alt="" className="h-12 lg:h-18" />
          </div>
        </div>
        <p className="text-center text-xs sm:text-base w-[80%] md:w-[100%] md:text-xl">
          Pesan Makanan di Kantin Kampus dengan Sekali Klik!
        </p>
        <div className="grid grid-cols-2 m-2 lg:m-12 sm:w-[70%] md:w-[90%] lg:grid-cols-4 gap-4 lg:gap-6 place-items-center">
          <img src={person1} alt="" />
          <img src={person2} alt="" />
          <img src={person3} alt="" />
          <img src={person4} alt="" />
        </div>
        <Link to={`/customer/food`}>
          <div className="flex items-center group cursor-pointer transition-all duration-300 ease-in-out">
            <button className="flex justify-center items-center bg-primary py-3 text-white px-6 lg:px-8 lg:py-3 rounded-full text-xs lg:text-lg font-semibold transition-all duration-300">
              JELAJAH SEKARANG
            </button>
            <button className="flex justify-center items-center border border-black rounded-full w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 group-hover:bg-black">
              <Icon
                icon={"heroicons-solid:arrow-right"}
                className="text-black text-base transition-transform duration-300 group-hover:text-white group-hover:rotate-0"
                style={{ transform: "rotate(-45deg)" }}
              />
            </button>
          </div>
        </Link>
      </div>

      <div className="bg-primary text-center  text-white lg:px-4 rounded-t-[30px]">
        <div className="flex flex-col px-6 lg:px-8 gap-10 lg:gap-20 py-10 sm:py-12 lg:py-28">
          <div className="flex flex-col gap-2 lg:gap-6 items-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
                SOLUSI JAJAN
              </h1>
              <div className="inline-block bg-white -rotate-[4deg] px-2 py-1 sm:py-0.5 lg:px-4 lg:py-2">
                <h1 className="text-primary text-3xl lg:text-5xl font-extrabold">
                  KANTIN
                </h1>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
              TANPA ANTRE!
            </h1>
            <p className="text-center text-xs sm:text-base mt-1 lg:text-lg lg:mt-0  sm:w-[90%] md:w-[100%]">
              Pesan dari mana saja, bayar cashless, dan ambil tanpa ribet. Jajan
              di kantin jadi lebih cepat, praktis, dan gampang deh!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-12 lg:px-28">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex justify-center items-center bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 rounded-full">
                <Icon
                  icon={"mingcute:time-fill"}
                  className="text-primary text-xl sm:text-3xl lg:text-6xl"
                />
              </div>
              <div className=" flex flex-col gap-1">
                <p className="text-sm sm:text-base lg:text-2xl font-semibold">
                  Pesan Tanpa Antre
                </p>
                <p className="text-xs sm:text-base lg:text-lg">
                  Ga perlu repot-repot nunggu
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex justify-center items-center bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 rounded-full">
                <Icon
                  icon={"mynaui:lightning-solid"}
                  className="text-primary text-2xl sm:text-3xl lg:text-6xl"
                />
              </div>
              <div className=" flex flex-col gap-1">
                <p className="text-sm sm:text-base lg:text-2xl font-semibold">
                  Bisa Diantar
                </p>
                <p className="text-xs sm:text-base lg:text-lg">
                  Exclusive, S&K berlaku
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex justify-center items-center bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 rounded-full">
                <Icon
                  icon={"garden:security-26"}
                  className="text-primary text-2xl sm:text-3xl lg:text-6xl"
                />
              </div>
              <div className=" flex flex-col gap-1">
                <p className="text-sm sm:text-base lg:text-2xl font-semibold">
                  Pre-Order Dijamin Aman
                </p>
                <p className="text-xs sm:text-base lg:text-lg">
                  Gak takut kehabisan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-element flex flex-col items-center justify-end gap-6 lg:gap-12 pt-7 sm:pt-9 lg:pt-20 px-4 lg:px-24 lg:mx-12 rounded-t-[30px]">
          <h1 className="text-[22px] md:text-4xl lg:text-6xl font-extrabold">
            PENJUAL JUGA JADI LEBIH EFISIEN!
          </h1>
          <img src={vendorDasbor} alt="" />
        </div>
      </div>

      <div className="bg-background text-center px-8 lg:px-12 rounded-t-[30px]">
        <div className="flex flex-col px-6 lg:px-8 gap-10 lg:gap-20 py-12 lg:py-24">
          <div className="flex flex-col gap-20">
            <div className="flex items-center justify-center sm:gap-3 lg:gap-6">
              <h1 className="text-[22px]  sm:text-3xl md:text-5xl lg:text-6xl font-extrabold">
                MENU TER -
              </h1>
              <div className="relative inline-block bg-primary py-0.5 px-6 sm:py-1 lg:px-12 lg:py-3">
                <div className="absolute left-[-1px] top-0 h-full w-4 lg:w-6 bg-background z-10 [clip-path:polygon(0_0,100%_50%,0_100%)]" />

                <div className="absolute right-[-1px] top-0 h-full w-4 lg:w-6 bg-background z-10 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />

                <h1 className="text-background text-l sm:text-2xl md:text-4xl lg:text-6xl font-extrabold relative z-20">
                  LARIS
                </h1>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
              <div
                className="relative bg-purple-element px-14 py-10 w-fit text-white flex flex-col justify-center"
                style={{
                  borderRadius: "20% 35% 35% 40% / 40% 20% 40% 25%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-purple-element w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  1
                </div>
                <img src={top1} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">
                    Bakmie Jumbo + Bakso
                  </h1>
                  <h3>Bakmie Efatta</h3>
                </div>
              </div>
              <div
                className="relative bg-tosca-element py-10 px-14 w-fit text-black flex flex-col justify-center"
                style={{
                  borderRadius: "48% 48% 5% 5%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-tosca-element w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  2
                </div>
                <img src={top2} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">Waffle Cokelat</h1>
                  <h3>Good Waffle</h3>
                </div>
              </div>
              <div
                className="relative bg-secondary py-10 px-12 w-fit text-black flex flex-col justify-center"
                style={{
                  borderRadius: "5% 5% 5% 5%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-secondary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  3
                </div>
                <img src={top3} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">
                    Nasi + Sapi Sambal Matah
                  </h1>
                  <h3>S&S Kitchen</h3>
                </div>
              </div>
              <div
                className="relative bg-secondary py-10 px-14 w-fit text-black flex flex-col justify-center"
                style={{
                  borderRadius: "48% 48% 5% 5%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-secondary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  4
                </div>
                <img src={top4} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">Nasi Ayam Hainan</h1>
                  <h3>Xiao Kee</h3>
                </div>
              </div>
              <div
                className="relative bg-primary py-10 px-12 w-fit text-white flex flex-col justify-center"
                style={{
                  borderRadius: "5% 5% 5% 5%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  5
                </div>
                <img src={top5} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">Nasi Goreng Telur</h1>
                  <h3>Pinangsia</h3>
                </div>
              </div>
              <div
                className="relative bg-purple-element px-14 py-10 w-fit text-white flex flex-col justify-center"
                style={{
                  borderRadius: "20% 35% 35% 40% / 40% 20% 40% 25%",
                }}
              >
                <div
                  className="absolute -top-6 -left- bg-white text-purple-element w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow"
                  style={{
                    boxShadow: "0px 4px 10px 0px rgba(254, 74, 35, 0.15)",
                  }}
                >
                  6
                </div>
                <img className="w-60" src={top6} alt="" />
                <div className="flex flex-col gap-1 mt-4">
                  <h1 className="font-semibold text-lg">Jus Alpukat</h1>
                  <h3>Omon's Corner</h3>
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 items-center sm:items-start">
          <div className="flex flex-col gap-2 sm:gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
              KATEGORI
            </h1>
            <img className="w-30 sm:w-50" src={arrow2} alt="" />
          </div>
          <div className="grid grid-rows-2 w-full gap-6">
            <div className="flex flex-wrap gap-5">
              <div className="bg-purple-element flex-1 min-w-[100px] flex items-center text-white font-medium rounded-4xl p-4 pl-6">
                <h1>Bakmie</h1>
              </div>
              <div className="bg-tosca-element flex-1 min-w-[100px] flex items-center font-semibold rounded-4xl p-4 pl-6">
                <h1>Nasi</h1>
              </div>
              <div className="bg-secondary flex-1 min-w-[100px] flex items-center font-semibold rounded-4xl p-4 pl-6">
                <h1>Dessert</h1>
              </div>
              <div className="bg-primary flex-1 min-w-[100px] flex items-center text-white font-medium rounded-4xl p-4 pl-6">
                <h1>Snack</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className=" bg-secondary flex-1 min-w-[100px] flex items-center font-semibold rounded-4xl p-4 pl-6">
                <h1>Minuman</h1>
              </div>
              <div className=" bg-primary flex-1 min-w-[100px] flex items-center text-white font-medium rounded-4xl p-4 pl-6">
                <h1>Waffle</h1>
              </div>
              <div className="bg-purple-element flex-1 min-w-[100px] flex items-center text-white font-medium rounded-4xl p-4 pl-6">
                <h1>Pizza</h1>
              </div>
              <div className="bg-tosca-element flex-1 min-w-[100px] flex items-center font-semibold rounded-4xl p-4 pl-6">
                <h1>Jus</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-36 flex flex-col gap-16">
          <div className="flex flex-col gap-2 lg:gap-4 items-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
                APA NIH
              </h1>
              <div className="inline-block bg-primary -rotate-[4deg] px-2 sm:py-0.5 lg:px-4 lg:py-2">
                <h1 className="text-background text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  KATA
                </h1>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
              MEREKA?
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="relative bg-white rounded-[20px] shadow-[0px_4px_10px_0px_rgba(254,74,35,0.15)] w-fit p-8">
              <img
                src={asterisk2}
                alt=""
                className="absolute top-[-12px] right-[32px] w-10 h-10"
              />

              <div className="flex flex-col lg:flex-row gap-8">
                <img
                  src={seller}
                  className="w-[40%] lg:w-[150px] h-fit"
                  alt=""
                />
                <div className="flex flex-col gap-2 items-start text-start">
                  <h1 className="text-xl font-semibold">Penjual</h1>
                  <p className="text-sm sm:text-lg">
                    Jadi gampang nge-track orderan, bisa tau juga komentar
                    pembeli buat tingkatin kualitas makanan. Lengkap deh
                    fiturnya, ada analitik juga. Jualan makin cuan!
                  </p>
                </div>
              </div>
            </div>

            <div className="relative bg-white rounded-[20px] shadow-[0px_4px_10px_0px_rgba(254,74,35,0.15)] w-fit p-8">
              <img
                src={asterisk3}
                alt=""
                className="absolute top-[-12px] right-[32px] w-10 h-10"
              />

              <div className="flex flex-col lg:flex-row gap-8">
                <img
                  src={student}
                  className="w-[35%] lg:w-[120px] h-fit"
                  alt=""
                />
                <div className="flex flex-col gap-2 items-start text-start">
                  <h1 className="text-xl font-semibold">Mahasiswa</h1>
                  <p className="text-sm sm:text-lg">
                    Love banget sama QTEENZ! Yang ciptain gacor cuy, pake nya
                    juga gampang. Gw ga perlu lari-lari lagi ke kantin, ga bakal
                    kena marah dosen karena telat :D
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center max-w-full mt-20">
        <div className="flex flex-col flex-grow h-full max-w-[5vw]">
          <div className=" h-20 bg-tosca-element"></div>
          <div className=" h-20 bg-secondary"></div>
        </div>
        <div className="bg-primary text-white flex flex-col min-w-[92.8vw] items-center justify-center gap-8 py-12 rounded-[20px]">
          <div className="flex flex-col gap-2 lg:gap-4 items-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
                MASUK
              </h1>
              <div className="inline-block bg-white -rotate-[2deg] px-2 sm:py-0.5 lg:px-4 lg:py-2">
                <h1 className="text-primary text-3xl md:text-3xl lg:text-5xl font-extrabold">
                  SEKARANG
                </h1>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
              DAN COBAIN!
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
            <div className="flex items-center gap-4 justify-center">
              <p>KLIK</p>
              <div className="border-l h-5 border-white/40" />
              <p>PESAN</p>
            </div>
            <div className="hidden sm:block border-l h-5 border-white/40" />
            <div className="flex items-center gap-4 justify-center">
              <p>MAKAN</p>
              <div className="border-l h-5 border-white/40" />
              <p>HAPPY</p>
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer flex justify-center items-center bg-white/20 text-white px-6 lg:px-8 py-2 rounded-full text-xs lg:text-lg font-semibold border border-primary hover:bg-white/30  transition-all duration-300 ease-in-out"
          >
            <Link to={`/login`}>MASUK</Link>
          </button>
        </div>
        <div className="flex flex-col flex-grow h-full max-w-[5vw]">
          <div className=" h-20 bg-tosca-element"></div>
          <div className=" h-20 bg-secondary"></div>
        </div>
      </div>
      <div className="text-primary px-8 lg:px-12 mt-10 mb-20 sm:mb-0 flex flex-col sm:flex-row gap-2 justify-center text-center sm:justify-between pb-8">
        <h1 className="text-xl font-extrabold">QTEENZ</h1>
        <p className="text-xs sm:text-sm">
          Copyright 2025 QTEENZ, All rights reserved.
        </p>
      </div>
    </div>
  );
}
