import type { WidgetId } from '../content/types';
import { MatrixExplorer } from './matrixExplorer';
import { RrefStepper } from './rrefStepper';
import { TrafficFlowLab } from './trafficFlowLab';
import { VectorSpanLab } from './vectorSpanLab';
import { DeterminantLab } from './determinantLab';
import { CramerSolver } from './cramerSolver';
import { LuDecomposer } from './luDecomposer';
import { AxiomTester } from './axiomTester';

export function WidgetView({ id }: { id: WidgetId }) {
  switch (id) {
    case 'matrixExplorer':
      return <MatrixExplorer />;
    case 'rrefStepper':
      return <RrefStepper />;
    case 'trafficFlowLab':
      return <TrafficFlowLab />;
    case 'vectorSpanLab':
      return <VectorSpanLab />;
    case 'determinantLab':
      return <DeterminantLab />;
    case 'cramerSolver':
      return <CramerSolver />;
    case 'luDecomposer':
      return <LuDecomposer />;
    case 'axiomTester':
      return <AxiomTester />;
    default:
      return null;
  }
}
