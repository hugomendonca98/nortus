import { AppAction } from '../types'

interface AppActionsSectionProps {
  actions: AppAction[]
}

export function AppActionsSection({ actions }: AppActionsSectionProps) {
  return (
    <div className="mb-6 px-4">
      <h4 className="text-white font-medium mb-3">Ações no app</h4>
      <div className="space-y-3">
        {actions.map((action) => (
          <div key={action.id}>
            <span className="text-gray-400 text-xs">{action.timeAgo}</span>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-white text-sm">{action.action}</p>
                {action.details && (
                  <p className="text-gray-400 text-xs mt-1">{action.details}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
