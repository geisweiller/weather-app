interface SearchInputProps {
  /**
   * This explains foo.
   */
  foo: boolean;
  /**
   * This explains bar.
   */
  bar: string;
  /**
   * This explains baz.
   */
  baz: string;
}

export const SearchInput = ({ foo, bar, baz }: SearchInputProps) => {
  return (
    <div className="relative">
      <input className="p-2 rounded-lg" />
      <div className="absolute"></div>
    </div>
  );
};
