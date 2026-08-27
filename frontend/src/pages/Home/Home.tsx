import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="px-5">
      <section className="h-dvh w-full flex items-center justify-center flex-col gap-10">
        <h1 className="text-6xl sm:text-8xl font-display text-center">
          <span className="italic underline text-(--primary-a30) font-display-alt">
            Fullstack
          </span>{" "}
          Trello Clone
        </h1>
        <img
          className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          alt="docker,postgresql,java,spring,websocket,openapi,swagger,typescript,react,tailwindcss"
          title="Docker, PostgreSQL, Java, Spring, WebSocket, OpenAPI, Swagger, TypeScript, React, TailwindCSS"
          src="https://skills.syvixor.com/api/icons?perline=15&i=docker,postgresql,java,spring,websocket,openapi,swagger,typescript,react,tailwindcss"
        />
        <div className="flex gap-4">
          <Link to="/me">
            <button className="flex items-center gap-2 h-12 bg-(--primary-a0)/60 hover:bg-(--primary-a0) transition-colors duration-300 px-4 text-lg md:text-xl font-display font-bold cursor-pointer">
              GET STARTED <ArrowRight size={22} />
            </button>
          </Link>
          <a
            href="https://github.com/NureddinFarzaliyev/fullstack-trello-clone"
            target="_blank"
            rel="noopener"
          >
            <button className="bg-[#15191C] h-12 flex items-center gap-2 pr-4 pl-2 text-lg md:text-xl font-display font-bold cursor-pointer">
              <img
                src="https://skills.syvixor.com/api/icons?perline=1&i=github"
                className="h-10"
              />
              Source
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
