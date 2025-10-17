export function MapComponent() {
  return (
    <div className="w-full" data-testid="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.123!2d20.6697!3d52.4328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb5e8e5e8e5e%3A0x5e5e5e5e5e5e5e5e!2sBohater%C3%B3w%20Modlina%2017%2C%2005-100%20Nowy%20Dw%C3%B3r%20Mazowiecki!5e0!3m2!1spl!2spl!4v1234567890"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa sklepu - Sklep BHP Pogotowie BHP"
        className="rounded-lg border-2 border-gray-300"
      />
      <div className="mt-6 text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="font-bold text-xl mb-2 text-black">Sklep BHP Pogotowie BHP</p>
        <p className="text-gray-700 font-medium">Bohaterów Modlina 17</p>
        <p className="text-gray-700 font-medium">05-100 Nowy Dwór Mazowiecki</p>
      </div>
    </div>
  );
}
