import React, { useState, useRef, useEffect } from 'react';
import {
  Trash2,
  Move,
  ZoomIn,
  ZoomOut,
  Download,
  Square,
  Layers,
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Point {
  x: number;
  y: number;
}

interface Line {
  id: string;
  start: Point;
  end: Point;
  type: 'deck' | 'stairs' | 'side';
  length: number;
  height?: number;
}

const DeckDesigner: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [tool, setTool] = useState<
    'deck' | 'stairs' | 'side' | 'move' | 'delete'
  >('deck');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);
  const [editingLine, setEditingLine] = useState<Line | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth - 40;
      canvas.height = window.innerHeight - 200;
    }
    drawCanvas();
  }, [lines, zoom, pan, selectedLine, editingLine]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Rysowanie siatki
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5 / zoom;
    const gridSize = 20;
    for (let x = 0; x <= canvas.width / zoom; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / zoom);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height / zoom; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width / zoom, y);
      ctx.stroke();
    }

    // Rysowanie linii
    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.strokeStyle = getLineColor(line);
      ctx.lineWidth = 2 / zoom;
      ctx.stroke();

      // Rysowanie etykiety długości
      const midX = (line.start.x + line.end.x) / 2;
      const midY = (line.start.y + line.end.y) / 2;
      const angle = Math.atan2(
        line.end.y - line.start.y,
        line.end.x - line.start.x
      );
      const length = line.length.toFixed(0);

      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(angle);
      ctx.fillStyle = '#ffffff';
      const textWidth = ctx.measureText(length).width;
      const padding = 5;
      ctx.fillRect(-textWidth / 2 - padding, -15, textWidth + padding * 2, 20);
      ctx.fillStyle = '#000000';
      ctx.font = `${12 / zoom}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${length} cm`, 0, -5);
      if (line.type === 'stairs' && line.height) {
        ctx.fillText(`H: ${line.height} cm`, 0, 10);
      }
      ctx.restore();
    });

    ctx.restore();
  };

  const getLineColor = (line: Line): string => {
    switch (line.type) {
      case 'deck':
        return line === selectedLine ? '#ff0000' : '#000000';
      case 'stairs':
        return line === selectedLine ? '#ff6600' : '#ff9900';
      case 'side':
        return line === selectedLine ? '#0066ff' : '#3399ff';
      default:
        return '#000000';
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    const snappedPoint = snapToGrid({ x, y });

    if (tool === 'move') {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (tool === 'delete') {
      const clickedLine = lines.find((line) =>
        isPointOnLine(snappedPoint, line)
      );
      if (clickedLine) {
        setLines(lines.filter((l) => l !== clickedLine));
      }
    } else {
      const existingLine = lines.find(
        (line) =>
          isPointOnLine(snappedPoint, line) ||
          isPointNearLineEnd(snappedPoint, line)
      );

      if (existingLine) {
        setCurrentLine(existingLine);
        setSelectedLine(existingLine);
      } else {
        const newLine: Line = {
          id: Date.now().toString(),
          start: snappedPoint,
          end: snappedPoint,
          type: tool,
          length: 0,
        };
        setCurrentLine(newLine);
        setLines((prevLines) => [...prevLines, newLine]);
        setSelectedLine(newLine);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    const snappedPoint = snapToGrid({ x, y });

    if (isDragging && tool === 'move') {
      setPan({
        x: pan.x + (e.clientX - dragStart.x),
        y: pan.y + (e.clientY - dragStart.y),
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (currentLine) {
      const updatedLine = {
        ...currentLine,
        end: snappedPoint,
        length: calculateDistance(currentLine.start, snappedPoint),
      };
      setCurrentLine(updatedLine);
      setLines((prevLines) =>
        prevLines.map((line) =>
          line.id === updatedLine.id ? updatedLine : line
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentLine(null);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    const snappedPoint = snapToGrid({ x, y });

    const clickedLine = lines.find((line) => isPointOnLine(snappedPoint, line));
    if (clickedLine) {
      setEditingLine(clickedLine);
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingLine) {
      const newLength = Number(e.target.value);
      const angle = Math.atan2(
        editingLine.end.y - editingLine.start.y,
        editingLine.end.x - editingLine.start.x
      );
      const newEnd = {
        x: editingLine.start.x + newLength * Math.cos(angle),
        y: editingLine.start.y + newLength * Math.sin(angle),
      };
      const updatedLine = { ...editingLine, end: newEnd, length: newLength };
      setLines((prevLines) =>
        prevLines.map((line) =>
          line.id === updatedLine.id ? updatedLine : line
        )
      );
      setEditingLine(updatedLine);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingLine && editingLine.type === 'stairs') {
      const newHeight = Number(e.target.value);
      const updatedLine = { ...editingLine, height: newHeight };
      setLines((prevLines) =>
        prevLines.map((line) =>
          line.id === updatedLine.id ? updatedLine : line
        )
      );
      setEditingLine(updatedLine);
    }
  };

  const snapToGrid = (point: Point): Point => {
    const gridSize = 20;
    return {
      x: Math.round(point.x / gridSize) * gridSize,
      y: Math.round(point.y / gridSize) * gridSize,
    };
  };

  const calculateDistance = (p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isPointOnLine = (point: Point, line: Line): boolean => {
    const distance = calculateDistance(line.start, line.end);
    const d1 = calculateDistance(point, line.start);
    const d2 = calculateDistance(point, line.end);
    return Math.abs(d1 + d2 - distance) < 0.1;
  };

  const isPointNearLineEnd = (point: Point, line: Line): boolean => {
    const snapDistance = 10;
    return (
      calculateDistance(point, line.start) < snapDistance ||
      calculateDistance(point, line.end) < snapDistance
    );
  };

  const handleZoomIn = () => {
    setZoom(zoom * 1.2);
  };

  const handleZoomOut = () => {
    setZoom(zoom / 1.2);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      canvas.width,
      canvas.height
    );
    pdf.save('deck_design.pdf');
  };

  const calculateTotalArea = (): number => {
    let area = 0;
    const deckLines = lines.filter((line) => line.type === 'deck');

    if (deckLines.length < 3) return 0;

    // Obliczanie pola powierzchni tarasu
    for (let i = 0; i < deckLines.length; i++) {
      const currentLine = deckLines[i];
      const nextLine = deckLines[(i + 1) % deckLines.length];
      area +=
        currentLine.start.x * nextLine.start.y -
        nextLine.start.x * currentLine.start.y;
    }

    // Dodawanie pola powierzchni schodów
    const stairsLines = lines.filter((line) => line.type === 'stairs');
    stairsLines.forEach((line) => {
      if (line.height) {
        area += line.length * line.height;
      }
    });

    return Math.abs(area / 10000); // Konwersja z cm² na m²
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Projektant tarasu</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            tool === 'deck' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('deck')}
        >
          <Square className="inline-block mr-2" />
          Taras
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tool === 'stairs' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('stairs')}
        >
          <Layers className="inline-block mr-2" />
          Schody
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tool === 'side' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('side')}
        >
          <Square className="inline-block mr-2" />
          Boki
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tool === 'move' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('move')}
        >
          <Move className="inline-block mr-2" />
          Przesuń
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tool === 'delete' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('delete')}
        >
          <Trash2 className="inline-block mr-2" />
          Usuń
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={handleZoomIn}
        >
          <ZoomIn className="inline-block mr-2" />
          Przybliż
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={handleZoomOut}
        >
          <ZoomOut className="inline-block mr-2" />
          Oddal
        </button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={handleExport}
        >
          <Download className="inline-block mr-2" />
          Eksportuj
        </button>
      </div>
      <div
        className="border border-gray-300 rounded"
        style={{ overflow: 'hidden' }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          style={{ cursor: tool === 'move' ? 'move' : 'crosshair' }}
        />
      </div>
      {selectedLine && (
        <div className="mt-4 space-y-2">
          <div>
            <label
              htmlFor="lineLength"
              className="block text-sm font-medium text-gray-700"
            >
              Długość linii (cm):
            </label>
            <input
              type="number"
              id="lineLength"
              value={selectedLine.length.toFixed(0)}
              onChange={handleLengthChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {selectedLine.type === 'stairs' && (
            <div>
              <label
                htmlFor="stairsHeight"
                className="block text-sm font-medium text-gray-700"
              >
                Wysokość schodów (cm):
              </label>
              <input
                type="number"
                id="stairsHeight"
                value={selectedLine.height || ''}
                onChange={handleHeightChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}
        </div>
      )}
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Całkowita powierzchnia: {calculateTotalArea().toFixed(2)} m²
        </p>
      </div>
    </div>
  );
};

export default DeckDesigner;
