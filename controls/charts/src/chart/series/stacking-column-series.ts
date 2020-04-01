import { StackValues, withInRange, getVisiblePoints } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Chart } from '../chart';
import { DoubleRange } from '../utils/double-range';
import { Series, Points } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../chart/model/chart-interface';

/**
 * `StackingColumnSeries` module used to render the stacking column series.
 */
export class StackingColumnSeries extends ColumnBase {

    /**
     * Render the Stacking column series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        series.isRectSeries = true;
        let sideBySideInfo: DoubleRange = this.getSideBySideInfo(series);
        let rect: Rect;
        let argsData: IPointRenderEventArgs;
        let stackedValue: StackValues = series.stackedValues;
        let visiblePoints: Points[] = getVisiblePoints(series);
        for (let point of visiblePoints) {
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, stackedValue.endValues[point.index],
                                         point.xValue + sideBySideInfo.end, stackedValue.startValues[point.index], series);
                argsData = this.triggerEvent(series, point, series.interior,
                                             { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, point, rect, argsData);
                    this.updateSymbolLocation(point, rect, series);
                }
            }
        }
        this.renderMarker(series);
    }
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    public doAnimation(series: Series): void {
        this.animate(series);
    }
    /**
     * To destroy the stacking column. 
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        return 'StackingColumnSeries';
    }
}


