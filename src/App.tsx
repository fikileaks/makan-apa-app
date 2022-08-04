import axios from 'axios';
import { useEffect, useState } from 'react';

type Imakan = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

const App = (): JSX.Element => {
  const [makanan, setMakanan] = useState<Imakan>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  const getMakanan = async (): Promise<void> => {
    console.log('makan masuk');
    setLoading(true);
    const baseURL: string = 'https://jsonplaceholder.typicode.com/posts';
    try {
      setLoading(false);
      const res = await axios(baseURL);
      const randomFood = Math.floor(Math.random() * res.data.length);
      const final = res.data.splice(randomFood, 1);
      setMakanan(final);
      setFetched(true);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const headerMakan: string[] = ['yuk makanan', 'mending makan ini deh', 'suka makan ini ga?', 'traktirin ini dong!', 'kayanya enak nih kalo makan', 'ini bikin laper ga?', 'makin laper ga si kalo makan ini'];
  const createRandom = Math.floor(Math.random() * headerMakan.length);
  const randomWord = headerMakan.splice(createRandom, 1);

  return (
    <div className=" bg-blue-500 mx-auto">
      <div className="container font-fredokaOne flex flex-col justify-center items-center gap-4 text-center mx-auto  text-white h-screen w-full">
        {!fetched && (
          <>
            <h1 className="mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-semibold">Mau Makan Apa Nih ?</h1>
            <h2 className="text-yellow-300 text-7xl sm:text-9xl  md:text-[10rem] font-fredoka mb-2">e</h2>
          </>
        )}
        <div>
          {!loading &&
            !error &&
            fetched === true &&
            makanan.map((makan) => (
              <div className="">
                <div className="mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-semibold">{randomWord}</div>
                <div key={makan.id}>
                  {/* <div>{makan.id}</div> */}
                  <div className="text-yellow-400 text-5xl sm:text-6xl md:text-7xl py-4 sm:py-8">{makan.title}</div>
                </div>
              </div>
            ))}
        </div>
        {/* BUTTON */}
        {!fetched && (
          <button onClick={() => getMakanan()} className="bg-blue-800 relative text-md sm:text-lg md:text-2xl font-semibold border-4 px-4 py-2 rounded-xl  hover:bg-sky-500">
            Coba Pilih...
          </button>
        )}
        {!loading && fetched && (
          <button onClick={() => getMakanan()} className="bg-blue-800 relative text-md sm:text-lg md:text-2xl font-semibold border-4 px-4 py-2 rounded-xl  hover:bg-sky-500">
            Cari yang lain
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
