export default function MDXComponent() {
  const handleClick = () => alert(`You clicked the button!`);

  return (
    <button
      onClick={handleClick}
      className="border border-black/10 p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
    >
      Relative Button
    </button>
  );
}
