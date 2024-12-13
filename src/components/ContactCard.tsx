import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Building, FileText, User, Mail, Navigation } from "lucide-react";
import { siteMetadata } from "../config/metadata";

const businessHours = [
  { day: "Poniedziałek", hours: "09:00–16:00" },
  { day: "Wtorek", hours: "09:00–16:00" },
  { day: "Środa", hours: "09:00–16:00" },
  { day: "Czwartek", hours: "09:00–16:00" },
  { day: "Piątek", hours: "09:00–16:00" },
  { day: "Sobota", hours: "Zamknięte" },
  { day: "Niedziela", hours: "Zamknięte" },
];

export function ContactCard() {
  const handleNavigation = () => {
    window.open('https://www.google.com/maps/dir//Kowalska+8-9%2FD,+82-300+Elbl%C4%85g/@54.1589988,19.3149878,17816m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x46fd4d9815ad9e9b:0x889fa4c5e7495e2b!2m2!1d19.3973879!2d54.1590269?hl=pl&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5E6D3]/30 to-[#862B44]/10 overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text mb-3">
            Kontakt
          </h2>
          <p className="text-lg text-[#862B44]/90 max-w-3xl mx-auto font-medium">
            Zapraszamy do kontaktu i odwiedzenia naszego biura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#862B44]/10"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Adres do doręczeń</h3>
                  <p className="text-[#862B44]/80 mb-3">{siteMetadata.company.address}</p>
                  <button
                    onClick={handleNavigation}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#862B44] to-[#A13553] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Navigation className="w-4 h-4" />
                    Prowadź do
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Telefon</h3>
                  <a 
                    href="tel:786131260"
                    className="text-[#862B44]/80 hover:text-[#862B44] transition-colors inline-flex items-center gap-2"
                  >
                    786 131 260
                    <span className="text-sm text-[#A13553]">(Zadzwoń teraz)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Email</h3>
                  <a 
                    href="mailto:biuro@podatkistankiewicz.pl"
                    className="text-[#862B44]/80 hover:text-[#862B44] transition-colors"
                  >
                    biuro@podatkistankiewicz.pl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-3">Godziny otwarcia</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    {businessHours.map((schedule) => (
                      <div key={schedule.day} className="contents">
                        <span className="text-[#862B44]/80 font-medium text-sm">{schedule.day}</span>
                        <span className="text-[#862B44]/80 text-sm text-right pl-8">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#862B44]/10"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Forma prawna</h3>
                  <p className="text-[#862B44]/80">{siteMetadata.company.type}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <User className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Przedsiębiorca</h3>
                  <p className="text-[#862B44]/80">{siteMetadata.company.owner}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Dane rejestrowe</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[#862B44]/80 font-medium">NIP: </span>
                      <span className="text-[#862B44]/80">{siteMetadata.company.registration.nip}</span>
                    </div>
                    <div>
                      <span className="text-[#862B44]/80 font-medium">REGON: </span>
                      <span className="text-[#862B44]/80">{siteMetadata.company.registration.regon}</span>
                    </div>
                    <div>
                      <span className="text-[#862B44]/80 font-medium">PKD: </span>
                      <span className="text-[#862B44]/80">{siteMetadata.company.registration.pkd}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#862B44] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#862B44] mb-2">Adres rejestrowy</h3>
                  <p className="text-[#862B44]/80">{siteMetadata.company.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <h1 className="text-xl font-bold text-[#862B44]">
            {siteMetadata.company.name}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
