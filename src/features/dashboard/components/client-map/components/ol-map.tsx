'use client'

import { useEffect, useRef } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Icon } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'
import { CustomerData } from '../types'
import { createMarkerIcon } from '../utils/icon-utils'

interface OlMapProps {
  customerData: CustomerData[]
}

export function OlMap({ customerData }: OlMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Create vector source and layer for markers
    const vectorSource = new VectorSource()
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })

    // Create the map - usar coordenadas do Recife como padrão
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([-34.8811, -8.0539]), // Coordenadas do Recife da API
        zoom: 12,
      }),
      controls: [],
    })

    mapInstanceRef.current = map

    // Apply dark theme to map tiles
    const tileLayer = map.getLayers().getArray()[0] as TileLayer<OSM>
    tileLayer.on('prerender', (evt) => {
      if (evt.context) {
        const context = evt.context as CanvasRenderingContext2D
        context.globalCompositeOperation = 'source-over'
      }
    })

    tileLayer.on('postrender', (evt) => {
      if (evt.context) {
        const context = evt.context as CanvasRenderingContext2D
        context.filter = 'none'
      }
    })

    return () => {
      map.setTarget(undefined)
    }
  }, [])

  // Update markers when customer data changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    const vectorLayer = mapInstanceRef.current
      .getLayers()
      .getArray()[1] as VectorLayer<VectorSource>
    const vectorSource = vectorLayer.getSource()

    if (vectorSource) {
      vectorSource.clear()

      // Process markers asynchronously
      const addMarkers = async () => {
        for (const customer of customerData) {
          const feature = new Feature({
            geometry: new Point(fromLonLat(customer.location)),
            name: customer.name,
            type: customer.type,
          })

          const iconDataUrl = await createMarkerIcon(
            customer.color,
            customer.icon,
          )

          feature.setStyle(
            new Style({
              image: new Icon({
                src: iconDataUrl,
                scale: 1,
                anchor: [0.5, 0.5],
              }),
            }),
          )

          vectorSource.addFeature(feature)
        }
      }

      addMarkers()
    }
  }, [customerData])

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-96 rounded-xl overflow-hidden border border-slate-600"
        style={{ filter: 'brightness(0.8) contrast(1.1)' }}
      />
    </div>
  )
}
