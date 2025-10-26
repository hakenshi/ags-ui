# Implementation Plan

- [x] 1. Configurar estrutura do projeto e tooling
  - Criar estrutura de diretórios (lib/components, lib/hooks, lib/utils, lib/primitives)
  - Configurar package.json com exports e types
  - Configurar tsconfig.json para biblioteca
  - Criar arquivo index.ts principal com exports
  - _Requirements: 9.1, 9.2, 10.1_

- [x] 2. Implementar utilitários base
  - [x] 2.1 Criar funções de formatação
    - Implementar formatTime para data/hora
    - Implementar formatBytes para tamanhos
    - Implementar formatPercentage para porcentagens
    - Implementar formatDuration para durações
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [x] 2.2 Criar utilitários de performance
    - Implementar função debounce
    - Implementar função throttle
    - _Requirements: 7.4, 7.5_
  
  - [x] 2.3 Criar utilitário clsx
    - Implementar composição de classes CSS
    - _Requirements: 7.6_

- [x] 3. Implementar primitivas de contexto e binding
  - [x] 3.1 Criar createContext helper
    - Implementar Provider e useContext
    - Adicionar validação de uso dentro de Provider
    - _Requirements: 1.3_
  
  - [x] 3.2 Criar createReactiveBinding helper
    - Wrapper para createBinding do gnim
    - Tipagem TypeScript correta
    - _Requirements: 1.2, 9.2_

- [ ] 4. Implementar hooks para serviços Astal
  - [x] 4.1 Implementar useBattery hook
    - Integrar com AstalBattery
    - Retornar percentage, charging, timeRemaining, available
    - Adicionar graceful degradation
    - _Requirements: 6.1_
  
  - [x] 4.2 Implementar useNetwork hook
    - Integrar com AstalNetwork
    - Retornar wifi e wired state
    - Expor lista de access points
    - _Requirements: 6.2_
  
  - [x] 4.3 Implementar useAudio hook
    - Integrar com AstalWp
    - Retornar speaker e microphone state
    - Fornecer setVolume e toggleMute
    - _Requirements: 6.3_
  
  - [x] 4.4 Implementar useHyprland hook
    - Integrar com AstalHyprland
    - Retornar workspaces, windows, active states
    - Fornecer focusWorkspace
    - _Requirements: 6.4_
  
  - [x] 4.5 Implementar useNotifications hook
    - Integrar com AstalNotifd
    - Retornar lista de notificações
    - Fornecer dismiss e dismissAll
    - _Requirements: 6.5_

- [x] 5. Implementar componentes básicos
  - [x] 5.1 Implementar Button component
    - Criar componente com onClick, disabled
    - Adicionar data attributes (data-disabled)
    - Suportar asChild pattern
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [x] 5.2 Implementar Input component
    - Criar campo de entrada com value, onValueChange
    - Suportar controlled/uncontrolled
    - Adicionar data attributes (data-disabled, data-invalid)
    - _Requirements: 1.1, 1.2_
  
  - [x] 5.3 Implementar Label component
    - Criar label com htmlFor
    - _Requirements: 1.1_

- [ ] 6. Implementar Slider component
  - [ ] 6.1 Criar componente Slider principal
    - Implementar value, onValueChange, min, max, step
    - Suportar controlled/uncontrolled
    - Adicionar context interno
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [ ] 6.2 Criar SliderTrack component
    - Renderizar track do slider
    - _Requirements: 1.1_
  
  - [ ] 6.3 Criar SliderThumb component
    - Implementar drag functionality
    - Calcular posição baseada em valor
    - Adicionar data-dragging
    - _Requirements: 1.2, 1.4_
  
  - [ ] 6.4 Criar SliderRange component
    - Renderizar range preenchido
    - _Requirements: 1.1_

- [ ] 7. Implementar Toggle component
  - [ ] 7.1 Criar componente Toggle
    - Implementar pressed, onPressedChange
    - Suportar controlled/uncontrolled
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_

- [ ] 8. Implementar Switch component
  - [ ] 8.1 Criar componente Switch principal
    - Implementar checked, onCheckedChange
    - Suportar controlled/uncontrolled
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 8.2 Criar SwitchThumb component
    - Renderizar thumb do switch
    - _Requirements: 1.1_

- [ ] 9. Implementar Checkbox component
  - [ ] 9.1 Criar componente Checkbox principal
    - Implementar checked, onCheckedChange
    - Suportar indeterminate state
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 9.2 Criar CheckboxIndicator component
    - Renderizar indicador visual
    - _Requirements: 1.1_

- [ ] 10. Implementar RadioGroup component
  - [ ] 10.1 Criar componente RadioGroup principal
    - Implementar value, onValueChange
    - Adicionar context interno
    - Suportar orientation
    - _Requirements: 1.2, 1.3_
  
  - [ ] 10.2 Criar RadioGroupItem component
    - Implementar seleção de item
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 10.3 Criar RadioGroupIndicator component
    - Renderizar indicador visual
    - _Requirements: 1.1_

- [ ] 11. Implementar Popover component
  - [ ] 11.1 Criar componente Popover principal
    - Implementar open, onOpenChange
    - Suportar controlled/uncontrolled
    - Adicionar context interno
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ] 11.2 Criar PopoverTrigger component
    - Implementar onClick handler
    - Adicionar data-state attribute
    - _Requirements: 2.1, 2.4_
  
  - [ ] 11.3 Criar PopoverContent component
    - Implementar posicionamento (position, align, sideOffset)
    - Adicionar data-state e data-side attributes
    - Implementar close on click outside
    - _Requirements: 2.4, 2.5_

- [ ] 12. Implementar Tooltip component
  - [ ] 12.1 Criar componente Tooltip principal
    - Implementar open, onOpenChange com delay
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 12.2 Criar TooltipTrigger component
    - Implementar hover handlers
    - _Requirements: 2.1_
  
  - [ ] 12.3 Criar TooltipContent component
    - Implementar posicionamento
    - Adicionar data-state e data-side attributes
    - _Requirements: 2.4_

- [ ] 13. Implementar Dialog component
  - [ ] 13.1 Criar componente Dialog principal
    - Implementar open, onOpenChange, modal
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 13.2 Criar DialogTrigger component
    - Implementar onClick handler
    - _Requirements: 2.1_
  
  - [ ] 13.3 Criar DialogPortal component
    - Renderizar em portal
    - _Requirements: 1.1_
  
  - [ ] 13.4 Criar DialogOverlay component
    - Renderizar overlay de fundo
    - _Requirements: 1.1_
  
  - [ ] 13.5 Criar DialogContent component
    - Implementar close on overlay click
    - Adicionar data-state attribute
    - _Requirements: 2.5_
  
  - [ ] 13.6 Criar DialogTitle, DialogDescription, DialogClose components
    - Componentes auxiliares
    - _Requirements: 1.1_

- [ ] 14. Implementar Tabs component
  - [ ] 14.1 Criar componente Tabs principal
    - Implementar value, onValueChange, orientation
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 14.2 Criar TabsList component
    - Container para triggers
    - _Requirements: 1.1_
  
  - [ ] 14.3 Criar TabsTrigger component
    - Implementar seleção de tab
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 14.4 Criar TabsContent component
    - Renderizar conteúdo baseado em value
    - Adicionar data-state attribute
    - _Requirements: 1.4_

- [ ] 15. Implementar Accordion component
  - [ ] 15.1 Criar componente Accordion principal
    - Implementar type (single/multiple), value, onValueChange
    - Adicionar context interno
    - Suportar collapsible
    - _Requirements: 1.2, 1.3_
  
  - [ ] 15.2 Criar AccordionItem component
    - Adicionar context interno para item
    - _Requirements: 1.3_
  
  - [ ] 15.3 Criar AccordionTrigger component
    - Implementar toggle de item
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 15.4 Criar AccordionContent component
    - Renderizar conteúdo expansível
    - Adicionar data-state attribute
    - _Requirements: 1.4_

- [ ] 16. Implementar Select component
  - [ ] 16.1 Criar componente Select principal
    - Implementar value, onValueChange
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 16.2 Criar SelectTrigger component
    - Implementar onClick handler
    - Adicionar data-state attribute
    - _Requirements: 2.1, 1.4_
  
  - [ ] 16.3 Criar SelectValue component
    - Exibir valor selecionado ou placeholder
    - _Requirements: 1.1_
  
  - [ ] 16.4 Criar SelectContent component
    - Implementar dropdown
    - Adicionar data-state attribute
    - _Requirements: 2.4_
  
  - [ ] 16.5 Criar SelectItem component
    - Implementar seleção de item
    - Adicionar data-selected attribute
    - _Requirements: 1.2, 1.4_

- [ ] 17. Implementar Progress component
  - [ ] 17.1 Criar componente Progress principal
    - Implementar value, max
    - Adicionar data-state, data-value, data-max attributes
    - _Requirements: 1.2, 1.4_
  
  - [ ] 17.2 Criar ProgressIndicator component
    - Renderizar barra de progresso
    - _Requirements: 1.1_

- [ ] 18. Implementar Separator component
  - [ ] 18.1 Criar componente Separator
    - Implementar orientation, decorative
    - Adicionar data-orientation attribute
    - _Requirements: 1.1, 1.4_

- [ ] 19. Implementar ScrollArea component
  - [ ] 19.1 Criar componente ScrollArea principal
    - Implementar type, scrollHideDelay
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 19.2 Criar ScrollAreaViewport component
    - Container com scroll
    - _Requirements: 1.1_
  
  - [ ] 19.3 Criar ScrollAreaScrollbar component
    - Implementar scrollbar customizada
    - Suportar orientation
    - _Requirements: 1.1_
  
  - [ ] 19.4 Criar ScrollAreaThumb component
    - Renderizar thumb da scrollbar
    - _Requirements: 1.1_

- [ ] 20. Implementar ContextMenu component
  - [ ] 20.1 Criar componente ContextMenu principal
    - Implementar onOpenChange
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 20.2 Criar ContextMenuTrigger component
    - Implementar right-click handler
    - _Requirements: 2.1_
  
  - [ ] 20.3 Criar ContextMenuContent component
    - Implementar posicionamento no cursor
    - _Requirements: 2.4_
  
  - [ ] 20.4 Criar ContextMenuItem, ContextMenuSeparator components
    - Componentes auxiliares
    - _Requirements: 1.1_

- [ ] 21. Implementar DropdownMenu component
  - [ ] 21.1 Criar componente DropdownMenu principal
    - Similar ao Popover mas com semântica de menu
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 21.2 Criar DropdownMenuTrigger component
    - Implementar onClick handler
    - _Requirements: 2.1_
  
  - [ ] 21.3 Criar DropdownMenuContent component
    - Implementar posicionamento
    - _Requirements: 2.4_
  
  - [ ] 21.4 Criar DropdownMenuItem, DropdownMenuCheckboxItem components
    - Items de menu com estados
    - _Requirements: 1.2, 1.4_
  
  - [ ] 21.5 Criar DropdownMenuSub components
    - Suportar submenus
    - _Requirements: 1.3_

- [ ] 22. Implementar componentes auxiliares
  - [ ] 22.1 Criar Avatar component
    - Implementar AvatarImage com fallback
    - Adicionar data-state attribute
    - _Requirements: 1.1, 1.4_
  
  - [ ] 22.2 Criar Badge component
    - Componente simples de badge
    - _Requirements: 1.1_
  
  - [ ] 22.3 Criar Card components
    - Criar Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    - _Requirements: 1.1_
  
  - [ ] 22.4 Criar Alert components
    - Criar Alert, AlertTitle, AlertDescription
    - Adicionar data-variant attribute
    - _Requirements: 1.1, 1.4_
  
  - [ ] 22.5 Criar AspectRatio component
    - Implementar ratio prop
    - _Requirements: 1.1_
  
  - [ ] 22.6 Criar Skeleton component
    - Componente simples de loading
    - _Requirements: 1.1_

- [ ] 23. Implementar Collapsible component
  - [ ] 23.1 Criar componente Collapsible principal
    - Implementar open, onOpenChange
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 23.2 Criar CollapsibleTrigger component
    - Implementar toggle
    - Adicionar data-state attribute
    - _Requirements: 1.2, 1.4_
  
  - [ ] 23.3 Criar CollapsibleContent component
    - Renderizar conteúdo colapsável
    - Adicionar data-state attribute
    - _Requirements: 1.4_

- [ ] 24. Implementar Command component
  - [ ] 24.1 Criar componente Command principal
    - Implementar value, onValueChange, filter
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 24.2 Criar CommandInput component
    - Campo de busca
    - _Requirements: 1.1_
  
  - [ ] 24.3 Criar CommandList component
    - Container para resultados
    - _Requirements: 1.1_
  
  - [ ] 24.4 Criar CommandEmpty component
    - Mensagem quando sem resultados
    - _Requirements: 1.1_
  
  - [ ] 24.5 Criar CommandGroup component
    - Agrupar items
    - _Requirements: 1.1_
  
  - [ ] 24.6 Criar CommandItem component
    - Item selecionável
    - _Requirements: 1.2_

- [ ] 25. Implementar HoverCard component
  - [ ] 25.1 Criar componente HoverCard principal
    - Implementar open, onOpenChange, delays
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 25.2 Criar HoverCardTrigger component
    - Implementar hover handlers com delay
    - _Requirements: 2.1_
  
  - [ ] 25.3 Criar HoverCardContent component
    - Implementar posicionamento
    - _Requirements: 2.4_

- [ ] 26. Implementar Menubar component
  - [ ] 26.1 Criar componente Menubar principal
    - Container para menus
    - _Requirements: 1.1_
  
  - [ ] 26.2 Criar MenubarMenu component
    - Menu individual
    - Adicionar context interno
    - _Requirements: 1.3_
  
  - [ ] 26.3 Criar MenubarTrigger, MenubarContent, MenubarItem components
    - Componentes de menu
    - _Requirements: 1.1, 1.2_

- [ ] 27. Implementar NavigationMenu component
  - [ ] 27.1 Criar componente NavigationMenu principal
    - Implementar navegação
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 27.2 Criar NavigationMenuList component
    - Container para items
    - _Requirements: 1.1_
  
  - [ ] 27.3 Criar NavigationMenuItem component
    - Item de navegação
    - _Requirements: 1.1_
  
  - [ ] 27.4 Criar NavigationMenuTrigger, NavigationMenuContent components
    - Trigger e conteúdo dropdown
    - _Requirements: 1.2, 2.4_

- [ ] 28. Implementar Resizable component
  - [ ] 28.1 Criar componente ResizablePanelGroup principal
    - Implementar direction
    - Adicionar context interno
    - _Requirements: 1.2, 1.3_
  
  - [ ] 28.2 Criar ResizablePanel component
    - Implementar defaultSize, minSize, maxSize
    - _Requirements: 1.2_
  
  - [ ] 28.3 Criar ResizableHandle component
    - Implementar drag para resize
    - _Requirements: 1.2_

- [ ] 29. Implementar Sheet component
  - [ ] 29.1 Criar componente Sheet principal
    - Implementar open, onOpenChange
    - Adicionar context interno
    - _Requirements: 2.1, 2.2_
  
  - [ ] 29.2 Criar SheetTrigger component
    - Implementar onClick handler
    - _Requirements: 2.1_
  
  - [ ] 29.3 Criar SheetContent component
    - Implementar side (top, right, bottom, left)
    - Adicionar data-state e data-side attributes
    - _Requirements: 2.4, 1.4_
  
  - [ ] 29.4 Criar SheetHeader, SheetTitle, SheetDescription, SheetFooter components
    - Componentes auxiliares
    - _Requirements: 1.1_

- [ ] 30. Implementar Toast component
  - [ ] 30.1 Criar componente ToastProvider
    - Provider para gerenciar toasts
    - _Requirements: 1.3_
  
  - [ ] 30.2 Criar componente Toast principal
    - Implementar open, onOpenChange, duration
    - _Requirements: 2.1, 2.2_
  
  - [ ] 30.3 Criar ToastTitle, ToastDescription, ToastAction, ToastClose components
    - Componentes auxiliares
    - _Requirements: 1.1_
  
  - [ ] 30.4 Criar ToastViewport component
    - Container para exibir toasts
    - _Requirements: 1.1_

- [ ] 31. Implementar componente Workspaces (Hyprland)
  - [ ] 31.1 Criar componente Workspaces principal
    - Usar useHyprland hook
    - Implementar filter, sort, showOnlyOccupied, showEmpty
    - Fornecer render prop com workspaces, activeWorkspace, focusWorkspace
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [ ] 31.2 Criar WorkspaceList component (opcional)
    - Componente helper para renderizar lista
    - _Requirements: 3.1_
  
  - [ ] 31.3 Criar WorkspaceButton component (opcional)
    - Botão pré-configurado para workspace
    - _Requirements: 3.1_

- [ ] 32. Implementar componente Windows (Hyprland)
  - [ ] 32.1 Criar componente Windows principal
    - Usar useHyprland hook
    - Implementar workspace, monitor, activeWorkspaceOnly filters
    - Fornecer render prop com windows, activeWindow, focusWindow, closeWindow
    - _Requirements: 3.1, 3.2_

- [ ] 33. Implementar componente BatteryIndicator
  - [ ] 33.1 Criar componente BatteryIndicator
    - Usar useBattery hook
    - Implementar showPercentage, showTimeRemaining, criticalLevel
    - Fornecer render prop com percentage, charging, timeRemaining, available
    - _Requirements: 3.1, 3.2_

- [ ] 34. Implementar componente NetworkIndicator
  - [ ] 34.1 Criar componente NetworkIndicator
    - Usar useNetwork hook
    - Implementar showSSID, showSpeed
    - Fornecer render prop com wifi, wired, connectToNetwork
    - _Requirements: 3.1, 3.2_

- [ ] 35. Implementar componente VolumeControl
  - [ ] 35.1 Criar componente VolumeControl
    - Usar useAudio hook
    - Implementar device, showPercentage
    - Fornecer render prop com volume, muted, setVolume, toggleMute
    - _Requirements: 3.1, 3.2_

- [ ] 36. Implementar componente MediaPlayer
  - [ ] 36.1 Criar componente MediaPlayer
    - Integrar com AstalMpris
    - Implementar preferredPlayer, showOnlyWhenActive
    - Fornecer render prop com metadata, status, play, pause, next, previous, seek
    - _Requirements: 3.1, 3.2_

- [ ] 37. Implementar componente NotificationPopup
  - [ ] 37.1 Criar componente NotificationPopup
    - Usar useNotifications hook
    - Implementar position, timeout, maxVisible
    - Fornecer render prop com notification, dismiss, invokeAction
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 38. Implementar componente SystemTray
  - [ ] 38.1 Criar componente SystemTray
    - Integrar com AstalTray (se disponível)
    - Implementar iconSize, filter
    - Fornecer render prop com items
    - Adicionar graceful degradation se tray não disponível
    - _Requirements: 3.1, 3.2_

- [ ] 39. Implementar componente Clock
  - [ ] 39.1 Criar componente Clock
    - Usar createPoll do ags/time
    - Implementar format, interval, locale
    - Fornecer render prop com time, date, timestamp
    - _Requirements: 3.1, 3.2_

- [ ] 40. Implementar componente AppLauncher
  - [ ] 40.1 Criar componente AppLauncher
    - Integrar com AstalApps
    - Implementar maxResults, categories, sortByFrequency
    - Fornecer render prop com apps, query, setQuery, launchApp, frequentApps, recentApps
    - Implementar lógica de busca e filtragem
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 41. Implementar componente OSD (On-Screen Display)
  - [ ] 41.1 Criar componente OSD genérico
    - Implementar value, icon, visible, timeout, position, animation
    - Fornecer render prop com value, icon, progress, visible
    - Implementar auto-hide com timeout
    - Adicionar animações de entrada/saída
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 41.2 Criar VolumeOSD component
    - Usar useAudio hook
    - Auto-detectar mudanças de volume
    - Implementar debounce
    - _Requirements: 5.1, 5.2_
  
  - [ ] 41.3 Criar BrightnessOSD component
    - Monitorar mudanças de brilho
    - Auto-detectar mudanças
    - Implementar debounce
    - _Requirements: 5.1, 5.2_
  
  - [ ] 41.4 Criar MicrophoneOSD component
    - Usar useAudio hook para microphone
    - Auto-detectar mudanças
    - _Requirements: 5.1, 5.2_
  
  - [ ] 41.5 Criar KeyboardBacklightOSD component
    - Monitorar mudanças de backlight
    - Auto-detectar mudanças
    - _Requirements: 5.1, 5.2_

- [ ] 42. Criar documentação e exemplos
  - [ ] 42.1 Criar README principal
    - Instruções de instalação
    - Overview da biblioteca
    - Filosofia headless
    - Links para documentação
    - _Requirements: 8.1_
  
  - [ ] 42.2 Documentar componentes primitivos
    - Documentar cada componente com props
    - Adicionar exemplos unstyled
    - Adicionar exemplos styled
    - _Requirements: 8.2, 8.3, 8.4_
  
  - [ ] 42.3 Documentar componentes compostos
    - Documentar Workspaces, Windows, Battery, etc
    - Adicionar exemplos de uso
    - _Requirements: 8.2, 8.3_
  
  - [ ] 42.4 Documentar hooks
    - Documentar cada hook com interface
    - Adicionar exemplos de uso
    - _Requirements: 8.2, 8.3_
  
  - [ ] 42.5 Criar exemplo completo de barra para Hyprland
    - Exemplo funcional usando componentes da biblioteca
    - Mostrar customização de estilos
    - _Requirements: 8.5_

- [ ] 43. Configurar build e publicação
  - [ ] 43.1 Configurar build process
    - Setup para compilar TypeScript
    - Gerar arquivos .d.ts
    - _Requirements: 9.1, 9.2_
  
  - [ ] 43.2 Configurar package.json para publicação
    - Definir exports corretos
    - Configurar types
    - Adicionar keywords e metadata
    - _Requirements: 10.1, 10.2_
  
  - [ ] 43.3 Criar CHANGELOG
    - Documentar versão inicial
    - _Requirements: 10.5_
