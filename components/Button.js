const Button = ({ children, inverted = false, lowOpacity = false }) => {
  return (
    <div className={`btn low-opacity-${lowOpacity} btn-inverted-${inverted}`}>
      {children}
      <style jsx>{`
        .btn {
          display: inline-block;
          border: 1px solid;
          padding: 1rem;
          font-size: 1.1rem;
          padding: 0.6rem 1rem;
          border-radius: 4rem;
          transition: 0.3s ease-out color, 0.3s ease-out background-color,
            0.3s ease-out opacity;
        }

        .btn.low-opacity-true {
          border-color: rgba(255, 255, 255, 0.5);
        }

        .btn.btn-inverted-true:hover {
          opacity: 0.4;
        }

        .btn:hover {
          background-color: white;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Button;
