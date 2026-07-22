function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider round" />
      {label && <span className="ms-2" style={{ fontSize: "13px" }}>{label}</span>}
    </label>
  );
}

export default ToggleSwitch;
