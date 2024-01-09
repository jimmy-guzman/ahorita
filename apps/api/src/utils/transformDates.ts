export const transformDates = <T extends { createdAt: Date; updatedAt: Date }>({
  createdAt,
  updatedAt,
  ...rest
}: T) => {
  return {
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...rest,
  };
};
