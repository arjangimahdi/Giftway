// Grid placement mirrors the artifact's scattered layout; the float durations
// differ per mark so they never move in lockstep. Classes are spelled out so
// Tailwind can see them.
export const occasions = [
  {
    id: 'birthday',
    label: 'Birthday',
    cell: 'col-start-1 row-start-1',
    duration: '8s',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    cell: 'col-start-2 row-start-2',
    duration: '10s',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    cell: 'col-start-1 row-start-3',
    duration: '9s',
  },
  {
    id: 'graduation',
    label: 'Graduation',
    cell: 'col-start-3 row-start-3',
    duration: '11s',
  },
  {
    id: 'housewarming',
    label: 'Housewarming',
    cell: 'col-start-2 row-start-4',
    duration: '9.5s',
  },
  {
    id: 'retirement',
    label: 'Retirement',
    cell: 'col-start-1 row-start-5',
    duration: '8.5s',
  },
] as const;
