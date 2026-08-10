const Avatar = ({ text }: { text: string }) => {
  return (
    <div className="avatar avatar-placeholder">
      <div className="bg-(--surface-tonal-a0) ring-2 ring-(--primary-a0) text-neutral-content w-24 rounded-full">
        <span className="text-3xl">{text}</span>
      </div>
    </div>
  );
};

export default Avatar;
