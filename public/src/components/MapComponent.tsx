export function MapComponent() {
  return (
    <div className="w-full" data-testid="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.7477477!2d20.6670!3d52.4340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI2JzAyLjQiTiAyMMKwNDAnMDEuMiJF!5e0!3m2!1spl!2spl!4v1234567890"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa sklepu BHP Perfekt - Nowy Dwór Mazowiecki"
        className="rounded-md"
      />
      <div className="mt-4 text-center">
        <p className="font-semibold text-lg">Sklep BHP Perfekt</p>
        <p className="text-muted-foreground">Bohaterów Modlina 17</p>
        <p className="text-muted-foreground">05-100 Nowy Dwór Mazowiecki</p>
      </div>
    </div>
  );
}
