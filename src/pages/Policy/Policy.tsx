import PolicyList from "./PolicyList";

export default function Policy() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20">
      {/* filter component */}
      <section>{/* search component */}</section>
      <section></section>
      <section>
        <PolicyList />
      </section>
    </div>
  );
}
