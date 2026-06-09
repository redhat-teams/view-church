import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#E8B21A] pt-20 pb-8 relative">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* COLONNE 1 */}

          <div>
            <h2 className="text-6xl font-extrabold text-[#071F5A] mb-6">
              Eglise
            </h2>

            <p className="text-[#071F5A] text-lg leading-8 mb-8">
              Une communauté chrétienne vivante et inspirante,
              dédiée à l'Évangile et au service de Dieu.
            </p>

            <div className="flex gap-6 text-[#071F5A] text-2xl">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>

          {/* COLONNE 2 */}

          <div>
            <h3 className="text-4xl font-bold text-[#071F5A] mb-8">
              Navigation
            </h3>

            <ul className="space-y-10 text-2xl text-[#071F5A]">
              <a href="/"><li>Accueil</li></a>
              <a href="/"><li>Qui sommes-nous</li></a>
              <a href=""><li>Évènements</li></a>
              <a href="#"><li>Enseignements</li></a>
            </ul>
          </div>

          {/* COLONNE 3 */}

          <div>
            <h3 className="text-4xl font-bold text-[#071F5A] mb-8">
              Entités
            </h3>

            <div className="space-y-4">

              <div className="bg-[#E0AA12] border border-[#c9970e] rounded-md p-4">
                <h4 className="font-bold text-[#071F5A]">
                  L'église
                </h4>

                <p className="text-sm text-[#071F5A]">
                  Mouvement de Jésus-Christ en Action
                </p>
              </div>

              <div className="bg-[#E0AA12] border border-[#c9970e] rounded-md p-4">
                <h4 className="font-bold text-[#071F5A]">
                  Le Ministère
                </h4>

                <p className="text-sm text-[#071F5A]">
                  Christine Michoud Ministries
                </p>
              </div>

            </div>
          </div>

          {/* COLONNE 4 */}

          <div>
            <h3 className="text-4xl font-bold text-[#071F5A] mb-8">
              Contacts
            </h3>

            <div className="space-y-6 text-[#071F5A]">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Abidjan</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>contact@moministere.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+2250789767638</span>
              </div>

            </div>
          </div>

        </div>

        {/* TRAIT */}

        <div className="border-t border-[#d2a21c] mt-12 pt-8">

          <p className="text-center text-[#071F5A] text-lg">
            © 2026 Communauté du Christ en Marche.
            Tous droits réservés.
          </p>

        </div>

      </div>

    </footer>
  );
}