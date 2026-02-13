"use client";

import UserProfile from "@/components/UserProfile";
import PackageUsage from "@/components/PackageUsage";
import UsageChart from "@/components/UsageChart";
import { useLocale } from "@/lib/LocaleContext";

export default function Home() {
  const { t } = useLocale();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">{t("sitesProfile")}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfile />
        </div>
        
        <div className="lg:col-span-2">
          <PackageUsage />
        </div>
      </div>
      
      <UsageChart />
    </div>
  );
}
