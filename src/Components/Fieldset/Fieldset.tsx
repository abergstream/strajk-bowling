import styles from "./Fieldset.module.css";
type FieldsetNumberProps = {
  title: string;
  value: number;
  setValue: (value: number) => void;
};
type FieldsetStringProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  date?: string;
};
type FieldsetSelectProps = {
  index: number;
  changeSize: (index: number, size: number) => void;
};

const FieldsetNumber: React.FC<FieldsetNumberProps> = ({
  title,
  value,
  setValue,
}) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{title}</legend>
      <input
        type="number"
        value={value}
        min="1"
        className={styles.input}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value ? parseInt(value) : 0);
        }}
      />
    </fieldset>
  );
};

export const FieldsetString: React.FC<FieldsetStringProps> = ({
  title,
  value,
  date,
  setValue,
}) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{title}</legend>
      <input
        type={title}
        value={value}
        min={date}
        className={styles.input}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </fieldset>
  );
};

const shoeSizes: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export const FieldsetSelect: React.FC<FieldsetSelectProps> = ({
  index,
  changeSize,
}) => {
  return (
    <fieldset key={index} className={styles.fieldset}>
      <legend>SHOE SIZE / PERSON {index + 1}</legend>
      <select
        className={styles.input}
        onChange={(e) => {
          changeSize(index, parseInt(e.target.value));
        }}
      >
        <option value="0">Choose size</option>
        {shoeSizes &&
          shoeSizes.map((size) => (
            <option key={size} value={size}>
              Euro {size}
            </option>
          ))}
      </select>
    </fieldset>
  );
};
export default FieldsetNumber;
