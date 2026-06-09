const ministries = [
  {
    title: "Centre Chrétien Missionnaire",
    description:
      "Évangélisation, formation des disciples et impact social.",
  },
  {
    title: "Prayer Winner",
    description:
      "Intercession, réveil spirituel et transformation des vies.",
  },
];

export default function MinistriesGrid() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-blue-950">
            Nos Ministères
          </h2>

          <p className="mt-4 text-gray-600">
            Découvrez les différentes branches de notre œuvre.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {ministries.map((ministry) => (
            <div
              key={ministry.title}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <div className="h-64 bg-slate-200" />

              <div className="p-8">

                <h3 className="text-2xl font-bold mb-4">
                  {ministry.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {ministry.description}
                </p>

                <button className="bg-blue-950 text-white px-5 py-3 rounded-lg">
                  Découvrir
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}