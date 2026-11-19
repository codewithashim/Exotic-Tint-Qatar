import type { ServiceDetail } from '@/features/services/data/services-data';

interface ServiceProcessStepsProps {
  service: ServiceDetail;
}

/** 4-step installation process grid. */
export default function ServiceProcessSteps({ service }: ServiceProcessStepsProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <span className="text-xs font-mono font-extrabold uppercase text-[#f27438]">
          HOW WE DELIVER FLAWLESS RESULTS
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-1">
          Our 4-Step Doha Installation Process
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {service.processSteps.map((step) => (
          <div
            key={step.step}
            className={`${step.color} text-[#121118] rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between`}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-white border-2 border-black font-mono font-extrabold text-xs shadow-[2px_2px_0px_#000]">
                STEP {step.step}
              </span>
              <h3 className="font-display font-extrabold text-xl mt-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-black/85 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-black/15 text-[11px] font-mono font-extrabold uppercase">
              Exotic Tint Qatar Standard
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
