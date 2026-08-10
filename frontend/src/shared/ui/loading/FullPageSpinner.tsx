const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--dark-a0) z-50">
      <span className="loading loading-spinner loading-xl opacity-80"></span>
    </div>
  );
};

export default FullPageSpinner;
