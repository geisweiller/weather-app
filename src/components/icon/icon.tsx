interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  /**
   * Icon code
   */
  code?: string;
  /**
   * Icon width
   */
  width?: number;
}

export const Icon = ({ code, width = 80, ...props }: IconProps) => {
  if (!code) return null;
  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt="icon"
      width={width}
      {...props}
    />
  );
};
