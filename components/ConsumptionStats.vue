<template>
     <div class="w-full h-full bg-white rounded-xl p-5 flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="font-bold text-lg">{{ option.title ?? 'Insights' }}</h1>
                <!-- <p class="text-xs text-muted-foreground">{{ option.subtitle }}</p> -->
            </div>
            <div class="flex gap-2 items-center">
              <!-- <ClusterFacetedFilter @handleFilter="handleClusterFilter"></ClusterFacetedFilter> -->
                <PeriodFacetedFilter @onDateChanged="onDateChanged"></PeriodFacetedFilter>
            </div>
            <!-- <DateRangePicker @handle-date-change="onDateChanged"></DateRangePicker> -->
        </div>
        <div v-if="consumptionStore.isLoadingConsumptionInsights" class="grid gap-4 md:grid-cols-2">
            <Card v-for="i in 4" :key="i" class="shadow-none">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">
                        <Skeleton class="h-4 w-24" />
                    </CardTitle>
                    <Skeleton class="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton class="h-6 w-16 mb-2" />
                    <Skeleton class="h-4 w-32" />
                </CardContent>
            </Card>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2">
            <Card :class="['shadow-none transition-opacity duration-300', {'opacity-50': +consumptionStore.stats.waterUsed == 0}]">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Water Used
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ consumptionStore.stats.waterUsed ? `${consumptionStore.stats.waterUsed} kL` : 'N/A' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  {{ consumptionStore.stats.waterUsedChangeDescription }}
                </p>
              </CardContent>
            </Card>
            <Card class="'shadow-none transition-opacity duration-300'">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Water Bill
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ consumptionStore.stats.estimatedBill ? `GHC${billStore.calculateTotalBill({ consumption: +consumptionStore.stats.waterUsed }) }` : 'N/A' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  {{ `GHC${billStore.calculateTotalBill({ consumption: +consumptionStore.stats.waterUsedChange }) }` }} since last period
                </p>
              </CardContent>
            </Card>
            <Card :class="['shadow-none transition-opacity duration-300', {'opacity-50': +consumptionStore.stats.peakUsageAmount == 0}]">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Peak Usage
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ consumptionStore.stats.peakUsageAmount ? `${consumptionStore.stats.peakUsageAmount} kL` : 'N/A' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  {{ consumptionStore.stats.peakUsageDate ? `on ${consumptionStore.stats.peakUsageDate}` : 'Date not available' }}
                </p>
              </CardContent>
            </Card>
            <Card :class="['shadow-none transition-opacity duration-300', {'opacity-50': !consumptionStore.stats.peakUsageGroup}]">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Peak Usage Group
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ consumptionStore.stats.peakUsageGroup ? `${getDeviceGroupName(consumptionStore.stats.peakUsageGroup)}` : 'N/A' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  Cluster
                </p>
              </CardContent>
            </Card>
            <Card :class="['shadow-none transition-opacity duration-300', {'opacity-50': !consumptionStore.stats.peakUsageGroup}]">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Average Water Used
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ consumptionStore.stats.averageConsumption }} kL
                </div>
                <p class="text-xs text-muted-foreground">
                  {{  }}
                </p>
              </CardContent>
            </Card>
            <Card :class="['shadow-none transition-opacity duration-300', {'opacity-50': true}]">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  CGP
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-lg font-bold">
                  {{ '0%' }}
                </div>
                <p class="text-xs text-muted-foreground">
                  ...
                </p>
              </CardContent>
            </Card>
        </div>
        
     </div>
</template>
<script setup lang="ts">
import { useConsumptionStore } from '~/stores/consumption/consumption.store';
import { useDeviceStore } from '~/stores/device/device.store';
import { useBillStore } from '~/stores/bill/bill.store.js';


const props = defineProps({
    option: {
        type: Object as PropType<{ title?:string, subtitle?:string, isLoading?:boolean, max:number, min:number, sum:number }>,
        required: true
    },
})

const consumptionStore = useConsumptionStore()
const billStore = useBillStore();


const handleClusterFilter = (selectedClusters: string[]) => {
   
};

const deviceStore = useDeviceStore()
const getDeviceGroupName = (id:string) => {

    const group = deviceStore.devicesGroups.find(group => group.objectId === id);
    return group ? group.name : 'Unknown Group';

};


const onDateChanged = (period: {start:Date, end:Date}) => {
    consumptionStore.getConsumptionInsightsByOrg(period.start.toISOString(), period.end.toISOString())
}

useAsyncData('consumptionInsights', async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const endDate = new Date(currentDate.getFullYear(), 11, 31);
  await consumptionStore.getConsumptionInsightsByOrg(startDate.toISOString(), endDate.toISOString());
}, {lazy:true});
</script>