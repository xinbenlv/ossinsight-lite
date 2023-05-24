'use client';
import { dashboards, library } from '@/app/bind';
import { groupItemsByCategory } from '@/src/utils/widgets';
import { useMemo } from 'react';
import Section from './Section';

export default async function Page ({ params }: any) {
  const dashboardName = decodeURIComponent(params.name);

  const dashboard = dashboards.getNullable(dashboardName)?.current;

  const items = useMemo(() => {
    return library.values.filter(item => {
      if (!dashboard) {
        return false;
      }
      return !dashboard.items.has(item.id ?? item.name);
    });
  }, []);

  const map = await groupItemsByCategory(items);

  return (
    <div className="font-sketch">
      <h2 className="text-xl font-bold">Add widget</h2>
      {Object.entries(map).map(([name, items]) => (
        <Section key={name} dashboardName={dashboardName} name={name} items={items} />
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';