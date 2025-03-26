// TODO pendiente separar el css import "@/public/css/about.css";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 relative">
        {/* Contenedor de imagen en el centro superior */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[400px] bg-zinc-300 z-10 rounded-lg shadow-lg hidden md:block">
          <div className="w-full h-full rounded-lg animate-pulse" />
          <div className="absolute bottom-4 flex justify-center w-full space-x-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>

        {/* Versión móvil de la imagen (visible solo en móvil) */}
        <div className="w-full h-[300px] bg-zinc-300 z-10 rounded-lg shadow-lg mb-4 md:hidden">
          <div className="w-full h-full rounded-lg animate-pulse" />
          <div className="absolute bottom-4 flex justify-center w-full space-x-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>

        {/* Sección izquierda - Habilidades */}
        <div className="bg-zinc-900 p-8 text-white rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
              <span className="text-red-500 opacity-20 absolute -top-1 -left-1">
                HABILIDADES
              </span>
              <span className="relative z-10">HABILIDADES</span>
            </h2>

            <div className="flex mb-2 text-xs md:text-sm">
              <span className="w-16 md:w-24">Básico</span>
              <span className="flex-1 text-center">Intermedio</span>
              <span className="w-16 md:w-24 text-right">avanzado</span>
            </div>

            <div className="space-y-6 md:space-y-8 mt-8">
              <div className="space-y-2">
                <h3 className="text-base md:text-lg mb-2">Adobe Illustrator</h3>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={`illustrator-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500"
                    ></div>
                  ))}
                  {[8, 9].map((i) => (
                    <div
                      key={`illustrator-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-red-500"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base md:text-lg mb-2">Adobe Photoshop</h3>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={`photoshop-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-400"
                    ></div>
                  ))}
                  {[8, 9].map((i) => (
                    <div
                      key={`photoshop-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-400"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base md:text-lg mb-2">Adobe InDesign</h3>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={`indesign-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500"
                    ></div>
                  ))}
                  {[5, 6, 7, 8, 9].map((i) => (
                    <div
                      key={`indesign-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-red-500"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base md:text-lg mb-2">FL Studios</h3>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={`flstudios-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-400"
                    ></div>
                  ))}
                  {[6, 7, 8, 9].map((i) => (
                    <div
                      key={`flstudios-${i}`}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-400"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Sobre Mi */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-800 relative">
              <span className="text-red-500 opacity-20 absolute -top-1 -left-1">
                SOBRE MI
              </span>
              <span className="relative z-10">SOBRE MI</span>
            </h2>

            <p className="mb-4 text-zinc-700">
              Hola, mi nombre es{" "}
              <span className="text-red-500 font-medium">Diego López</span>
            </p>

            <p className="mb-6 text-sm md:text-base text-zinc-600 leading-relaxed">
              Soy un diseñador gráfico con experiencia dentro del campo y un
              apasionado la creatividad, tecnologías e innovaciones, cualidades
              que planto en cada uno de mis trabajos y proyectos que he
              desarrollado, con el objetivo de crear algo nuevo que se distinga
              de las competencia dentro del mercado.
            </p>

            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              Me gusta aprender, aprovechar de la experiencia para potenciar mis
              habilidades y los valores del compromiso, el trabajo en equipo,
              como el liderazgo que me definen como persona.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
