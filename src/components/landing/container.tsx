const Container = (props: any) => {
  return (
    <div
      className={`max-w-7xl p-8 mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
