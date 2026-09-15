import { stages } from './waiting-room.const';

export function WaitingRoom() {
  return (
    <div className="mt-32 bg-primary-900">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-16 px-6 py-24 lg:gap-20 lg:px-8">
        <div className="flex grow shrink basis-80 flex-col gap-4">
          <h2 className="text-balance text-3xl font-medium leading-display tracking-tight">
            Fifteen seconds of visible thinking, not a spinner
          </h2>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-primary-100">
            Partner catalogues are searched live, so prices and stock are real.
            The wait shows the work.
          </p>
        </div>

        <ol className="flex grow shrink basis-64 flex-col gap-5">
          {stages.map((stage) => (
            <li
              key={stage.label}
              className={`flex items-center gap-4 ${
                stage.state === 'active' ? '' : 'opacity-70'
              }`}
            >
              <span
                aria-hidden
                className={`size-2 flex-none rounded-full ${
                  stage.state === 'pending'
                    ? 'bg-primary-700'
                    : 'bg-primary-300'
                } ${stage.state === 'active' ? 'animate-pulse-dot' : ''}`}
              />
              <span
                className={`text-md ${
                  stage.state === 'active' ? 'font-medium' : ''
                } ${stage.state === 'pending' ? 'text-primary-200' : ''}`}
              >
                {stage.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
