interface heading {
  label: string;
}

const Heading: React.FC<heading> = ({ label }) => {
  return <div className={"font-bold text-4xl pt-6"}>{label}</div>;
};

export default Heading;
