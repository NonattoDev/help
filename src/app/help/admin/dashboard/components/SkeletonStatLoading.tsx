export default function SkeletonStatLoading() {
  return (
    <div className="stats skeleton">
      <div className="skeleton stat">
        <div className="stat-figure animate-pulse bg-primary"></div>
        <div className="skeleton stat-title">Carregando...</div>
        <div className="skeleton stat-value">0</div>
      </div>
    </div>
  );
}
