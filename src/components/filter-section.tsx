import { Filter } from './universal-tour-finder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Globe, Clock, Compass, DollarSign, GraduationCap, Star } from 'lucide-react'

type FilterSectionProps = {
  filter: Filter
  onFilterChange: (newFilter: Partial<Filter>) => void
  onResetFilters: () => void
  collections: string[]
  destinations: string[]
  durations: string[]
}

export default function FilterSection({
  filter,
  onFilterChange,
  onResetFilters,
  collections,
  destinations,
  durations,
}: FilterSectionProps) {
  return (
    <section className="bg-white shadow-md py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Destination Filter */}
          <FilterSelect
            icon={<Globe className="mr-2 h-4 w-4" />}
            label="Destination"
            value={filter.destination}
            onChange={(value) => onFilterChange({ destination: value })}
            options={destinations.map((destination) => ({
              value: destination,
              label: destination,
            }))}
          />

          {/* Collection Filter */}
          <FilterSelect
            icon={<Compass className="mr-2 h-4 w-4" />}
            label="Collections"
            value={filter.collection}
            onChange={(value) => onFilterChange({ collection: value })}
            options={collections.map((collection) => ({
              value: collection,
              label: collection,
            }))}
          />

          {/* Duration Filter */}
          <FilterSelect
            icon={<Clock className="mr-2 h-4 w-4" />}
            label="Duration"
            value={filter.duration}
            onChange={(value) => onFilterChange({ duration: value })}
            options={durations.map((duration) => ({
              value: duration,
              label: duration,
            }))}
          />

          {/* Price Range Filter */}
          <div className="flex flex-col">
            <Label className="mb-2">Price Range</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filter.priceRange}
                onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
                className="w-full"
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ${filter.priceRange[0]} - ${filter.priceRange[1]}
            </div>
          </div>
        </div>

        {/* Special Categories */}
        <div className="flex flex-col space-y-4 mt-4">
          <h3 className="font-semibold">Special Categories</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-collections"
              checked={filter.showByCollection}
              onCheckedChange={(checked) => onFilterChange({ showByCollection: checked })}
            />
            <Label htmlFor="show-collections">Show by Collection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="travel-for-credit"
              checked={filter.travelForCredit}
              onCheckedChange={(checked) => onFilterChange({ travelForCredit: checked })}
            />
            <Label htmlFor="travel-for-credit">Travel for Credit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="a-plus-collection"
              checked={filter.aPlusCollection}
              onCheckedChange={(checked) => onFilterChange({ aPlusCollection: checked })}
            />
            <Label htmlFor="a-plus-collection">A+ Collection</Label>
          </div>
        </div>

        {/* Reset Filters */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        </div>
      </div>
    </section>
  )
}

type FilterSelectProps = {
  icon: React.ReactNode
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

function FilterSelect({ icon, label, value, onChange, options }: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label}>
          <div className="flex items-center">
            {icon}
            <span>{value ? options.find((opt) => opt.value === value)?.label : label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
