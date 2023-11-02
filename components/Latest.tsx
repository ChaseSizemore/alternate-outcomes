interface InfoItemProps {
  title: string;
  value: string;
}

export function InfoItem({ title, value }: InfoItemProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm font-medium leading-6 text-gray-500">{title}</dt>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900 text-center">
        {value}
      </dd>
    </div>
  );
}

export default function Example({ latest }: any) {
  return (
    <dl className="mx-3/4 grid grid-cols-1 gap-px  sm:grid-cols-2 lg:grid-cols-4">
      <InfoItem title="Bootcamp" value={latest.bootcamp} />
      <InfoItem title="Company" value={latest.company} />
      <InfoItem title="Position" value={latest.position} />
      <InfoItem
        title="Salary"
        value={
          latest.salary
            ? parseInt(latest.salary, 10).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : ''
        }
      />
    </dl>
  );
}

