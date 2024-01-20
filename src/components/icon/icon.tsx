interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  /**
   * Icon code
   */
  code?: string;
}

export const Icon = ({ code, ...props }: IconProps) => {
  if (!code) return null;
  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt="icon"
      {...props}
    />
  );
};
