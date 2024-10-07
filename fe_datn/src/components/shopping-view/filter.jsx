import { filterOptions } from "@/config/index.js";
import { Fragment } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b h-[60.3px]">
        <h2 className="text-2xl font-extrabold my-[auto]">Tìm kiếm</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem,i) => (
          <Fragment key={i}>
            <div>
              <h3 className="text-lg font-bold">{keyItem}</h3>
              <div className="grid gap-3 mt-2">
                {filterOptions[keyItem].map((option,index) => (
                  <Label className="flex font-medium text-base items-center gap-2 " key={index}>
                    <Checkbox
                      className="bg-white border-2"
                      key={index}
                      checked={
                        filters.includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
