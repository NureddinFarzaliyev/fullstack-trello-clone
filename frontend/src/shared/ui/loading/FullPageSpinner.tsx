import Spinner from "./Spinner";

const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--dark-a0) z-50">
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
