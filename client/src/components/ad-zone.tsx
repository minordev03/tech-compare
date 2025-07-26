interface AdZoneProps {
  size: "300x600" | "320x50" | "728x90";
  mobile?: boolean;
}

export default function AdZone({ size, mobile = false }: AdZoneProps) {
  const [width, height] = size.split("x").map(Number);

  return (
    <div
      className={`bg-[var(--neutral-50)] border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg ${
        mobile ? "" : "h-96"
      }`}
      style={mobile ? { height: `${height}px` } : undefined}
    >
      <div className="text-center text-[var(--neutral-600)]">
        <i className="fas fa-ad text-3xl mb-2" />
        <p className="text-sm">
          Google AdSense<br />
          {size}
        </p>
        {mobile && (
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-sm" />
          </button>
        )}
      </div>
    </div>
  );
}
