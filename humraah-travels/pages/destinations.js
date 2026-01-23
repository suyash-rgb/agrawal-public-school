const destinations = [
  {
    name: "Kashmir",
    tagline: "Heaven on Earth",
    highlights: "Dal Lake, Gulmarg, Pahalgam",
    image: "/images/kashmir.jpg",
  },
  {
    name: "Ladakh",
    tagline: "Land of High Passes",
    highlights: "Pangong Lake, Nubra Valley",
    image: "/images/ladakh.jpg",
  },
  {
    name: "Manali",
    tagline: "Valley of Gods",
    highlights: "Rohtang Pass, Solang Valley",
    image: "/images/manali.jpg",
  },
  {
    name: "Goa",
    tagline: "Beach Paradise",
    highlights: "Coastal vibes, nightlife, heritage",
    image: "/images/goa.jpg",
  },
];

export default function Destinations() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-2">Popular Domestic Destinations</h1>
      <p className="text-center text-gray-500 mb-10">
        Explore incredible India with Humraah — har destination ek nayi kahani
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((place) => (
          <div
            key={place.name}
            className="card bg-base-100 shadow-xl group overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title justify-center">{place.name}</h2>
              <p className="text-sm text-gray-500">{place.tagline}</p>
              <p className="text-xs mt-1 text-gray-400">{place.highlights}</p>
              <div className="card-actions justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="btn btn-primary btn-sm">Enquire Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}