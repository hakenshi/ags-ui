# Design Document

## Overview

Este documento descreve o design técnico de uma biblioteca de componentes headless para AGS/Astal/gnim, inspirada no Radix UI. A biblioteca fornece componentes com lógica e comportamento prontos, mas completamente sem estilos, permitindo customização total da aparência visual.

A arquitetura segue princípios de composição, onde componentes complexos são construídos a partir de primitivas simples. Cada componente expõe sua lógica interna via props e estados, mas não impõe nenhuma decisão visual.

## Architecture

### Project Structure

```
lib/
├── components/
│   ├── Popover/
│   │   ├── index.tsx           # Export público
│   │   ├── Popover.tsx         # Componente principal
│   │   ├── PopoverTrigger.tsx  # Sub-componente
│   │   ├── PopoverContent.tsx  # Sub-componente
│   │   └── types.ts            # Interfaces
│   ├── Slider/
│   │   ├── index.tsx
│   │   ├── Slider.tsx
│   │   ├── SliderTrack.tsx
│   │   ├── SliderThumb.tsx
│   │   └── types.ts
│   ├── Toggle/
│   │   ├── index.tsx
│   │   ├── Toggle.tsx
│   │   └── types.ts
│   └── ...
├── hooks/
│   ├── useBattery.ts
│   ├── useNetwork.ts
│   ├── useAudio.ts
│   ├── useHyprland.ts
│   ├── useNotifications.ts
│   └── index.ts
├── utils/
│   ├── format.ts               # Funções de formatação
│   ├── debounce.ts
│   ├── throttle.ts
│   ├── clsx.ts
│   └── index.ts
├── primitives/
│   ├── createContext.ts        # Context helper
│   ├── createBinding.ts        # Binding helper
│   └── index.ts
└── index.ts                    # Export principal
```

### Design Principles

1. **Headless First**: Componentes não incluem estilos, apenas comportamento
2. **Composable**: Componentes complexos são compostos de primitivas simples
3. **Accessible**: Estados e propriedades expostos via data attributes
4. **Type-Safe**: TypeScript types completos para todas as APIs
5. **Reactive**: Integração nativa com gnim para reatividade
6. **Flexible**: Suporte a render props e children customizáveis

## Components and Interfaces

### 1. Button Component (Headless)

**Responsabilidade**: Botão com estados e variantes

**Component Structure**:
```typescript
<Button onClick={fn} disabled={boolean}>
  {/* Conteúdo customizável */}
</Button>
```

**Props Interface**:
```typescript
interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
  children: any
  className?: string
}
```

**Data Attributes**:
- `data-disabled` quando disabled
- `data-loading` quando em loading state (opcional)

### 2. Input Component (Headless)

**Responsabilidade**: Campo de entrada de texto

**Component Structure**:
```typescript
<Input 
  value={string} 
  onValueChange={fn}
  placeholder="..."
  type="text"
/>
```

**Props Interface**:
```typescript
interface InputProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'search'
  disabled?: boolean
  required?: boolean
  className?: string
}
```

**Data Attributes**:
- `data-disabled`
- `data-invalid` quando validação falha

### 3. Label Component (Headless)

**Responsabilidade**: Label para inputs com associação

**Component Structure**:
```typescript
<Label htmlFor="input-id">
  Label text
</Label>
```

**Props Interface**:
```typescript
interface LabelProps {
  htmlFor?: string
  children: any
  className?: string
}
```

### 4. Popover Component (Headless)

**Responsabilidade**: Gerenciar estado de abertura/fechamento e posicionamento de popover

**Component Structure**:
```typescript
// Componente raiz que gerencia estado
<Popover open={boolean} onOpenChange={fn}>
  <PopoverTrigger>
    {/* Botão customizável */}
  </PopoverTrigger>
  <PopoverContent>
    {/* Conteúdo customizável */}
  </PopoverContent>
</Popover>
```

**Props Interface**:
```typescript
interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: any
}

interface PopoverTriggerProps {
  asChild?: boolean
  children: any
  className?: string
}

interface PopoverContentProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  children: any
  className?: string
}
```

**State Management**:
- Estado de abertura: controlled ou uncontrolled
- Posicionamento: calculado baseado em props
- Context interno para compartilhar estado entre sub-componentes

**Data Attributes**:
- `data-state="open" | "closed"` no trigger e content
- `data-side="top" | "bottom" | "left" | "right"` no content

**Key Methods**:
- `open()`: Abrir popover
- `close()`: Fechar popover
- `toggle()`: Alternar estado

### 2. Slider Component (Headless)

**Responsabilidade**: Gerenciar valor e interação de slider

**Component Structure**:
```typescript
<Slider value={number} onValueChange={fn} min={0} max={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

**Props Interface**:
```typescript
interface SliderProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  children: any
  className?: string
}

interface SliderTrackProps {
  children: any
  className?: string
}

interface SliderThumbProps {
  className?: string
}
```

**State Management**:
- Valor atual: controlled ou uncontrolled
- Posição do thumb: calculada baseada em valor/min/max
- Drag state: tracking de mouse/touch events

**Data Attributes**:
- `data-disabled` quando disabled
- `data-orientation="horizontal" | "vertical"`
- `data-dragging` durante drag

**Key Methods**:
- `setValue(value: number)`: Atualizar valor
- `increment()`: Incrementar por step
- `decrement()`: Decrementar por step

### 3. Toggle Component (Headless)

**Responsabilidade**: Gerenciar estado on/off

**Component Structure**:
```typescript
<Toggle pressed={boolean} onPressedChange={fn}>
  {/* Conteúdo customizável */}
</Toggle>
```

**Props Interface**:
```typescript
interface ToggleProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  children: any
  className?: string
}
```

**State Management**:
- Estado pressed: controlled ou uncontrolled
- Disabled state

**Data Attributes**:
- `data-state="on" | "off"`
- `data-disabled` quando disabled

### 4. Tooltip Component (Headless)

**Responsabilidade**: Exibir tooltip ao hover

**Component Structure**:
```typescript
<Tooltip delayDuration={700}>
  <TooltipTrigger>
    {/* Elemento que dispara tooltip */}
  </TooltipTrigger>
  <TooltipContent>
    {/* Conteúdo do tooltip */}
  </TooltipContent>
</Tooltip>
```

**Props Interface**:
```typescript
interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  children: any
}

interface TooltipTriggerProps {
  asChild?: boolean
  children: any
}

interface TooltipContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  children: any
  className?: string
}
```

**State Management**:
- Hover state com delay
- Posicionamento automático

**Data Attributes**:
- `data-state="open" | "closed"`
- `data-side="top" | "bottom" | "left" | "right"`

### 5. Dialog Component (Headless)

**Responsabilidade**: Gerenciar modal/dialog com overlay

**Component Structure**:
```typescript
<Dialog open={boolean} onOpenChange={fn}>
  <DialogTrigger>
    {/* Botão que abre dialog */}
  </DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogTitle />
      <DialogDescription />
      {/* Conteúdo */}
      <DialogClose />
    </DialogContent>
  </DialogPortal>
</Dialog>
```

**Props Interface**:
```typescript
interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  children: any
}
```

**Data Attributes**:
- `data-state="open" | "closed"`

### 6. Tabs Component (Headless)

**Responsabilidade**: Gerenciar navegação por abas

**Component Structure**:
```typescript
<Tabs value={string} onValueChange={fn}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    {/* Conteúdo tab 1 */}
  </TabsContent>
  <TabsContent value="tab2">
    {/* Conteúdo tab 2 */}
  </TabsContent>
</Tabs>
```

**Props Interface**:
```typescript
interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  children: any
}
```

**Data Attributes**:
- `data-state="active" | "inactive"` nos triggers e contents
- `data-orientation="horizontal" | "vertical"`

### 7. Accordion Component (Headless)

**Responsabilidade**: Gerenciar seções expansíveis

**Component Structure**:
```typescript
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>
      {/* Header */}
    </AccordionTrigger>
    <AccordionContent>
      {/* Conteúdo expansível */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Props Interface**:
```typescript
interface AccordionProps {
  type: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  disabled?: boolean
  children: any
}
```

**Data Attributes**:
- `data-state="open" | "closed"`
- `data-disabled`

### 8. Select Component (Headless)

**Responsabilidade**: Gerenciar dropdown de seleção

**Component Structure**:
```typescript
<Select value={string} onValueChange={fn}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Props Interface**:
```typescript
interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: any
}
```

**Data Attributes**:
- `data-state="open" | "closed"`
- `data-disabled`
- `data-selected` nos items

### 9. Switch Component (Headless)

**Responsabilidade**: Toggle switch (similar ao Toggle mas com semântica diferente)

**Component Structure**:
```typescript
<Switch checked={boolean} onCheckedChange={fn}>
  <SwitchThumb />
</Switch>
```

**Props Interface**:
```typescript
interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  children?: any
  className?: string
}
```

**Data Attributes**:
- `data-state="checked" | "unchecked"`
- `data-disabled`

### 10. Progress Component (Headless)

**Responsabilidade**: Barra de progresso

**Component Structure**:
```typescript
<Progress value={number} max={100}>
  <ProgressIndicator />
</Progress>
```

**Props Interface**:
```typescript
interface ProgressProps {
  value?: number
  max?: number
  children?: any
  className?: string
}
```

**Data Attributes**:
- `data-state="loading" | "complete"`
- `data-value` com valor atual
- `data-max` com valor máximo

### 11. Separator Component (Headless)

**Responsabilidade**: Linha divisória

**Component Structure**:
```typescript
<Separator orientation="horizontal" decorative />
```

**Props Interface**:
```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
}
```

**Data Attributes**:
- `data-orientation="horizontal" | "vertical"`

### 12. ScrollArea Component (Headless)

**Responsabilidade**: Área com scroll customizável

**Component Structure**:
```typescript
<ScrollArea>
  <ScrollAreaViewport>
    {/* Conteúdo */}
  </ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="vertical">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>
```

**Props Interface**:
```typescript
interface ScrollAreaProps {
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  scrollHideDelay?: number
  children: any
  className?: string
}
```

### 13. ContextMenu Component (Headless)

**Responsabilidade**: Menu de contexto (botão direito)

**Component Structure**:
```typescript
<ContextMenu>
  <ContextMenuTrigger>
    {/* Elemento que dispara menu */}
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Item 2</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

**Props Interface**:
```typescript
interface ContextMenuProps {
  onOpenChange?: (open: boolean) => void
  children: any
}
```

### 14. DropdownMenu Component (Headless)

**Responsabilidade**: Menu dropdown (similar ao Popover mas com semântica de menu)

**Component Structure**:
```typescript
<DropdownMenu>
  <DropdownMenuTrigger>
    {/* Botão */}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>
      Checkbox Item
    </DropdownMenuCheckboxItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

### 15. RadioGroup Component (Headless)

**Responsabilidade**: Grupo de radio buttons

**Component Structure**:
```typescript
<RadioGroup value={string} onValueChange={fn}>
  <RadioGroupItem value="1">
    <RadioGroupIndicator />
  </RadioGroupItem>
  <RadioGroupItem value="2">
    <RadioGroupIndicator />
  </RadioGroupItem>
</RadioGroup>
```

**Props Interface**:
```typescript
interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  children: any
}
```

### 16. Checkbox Component (Headless)

**Responsabilidade**: Checkbox com estados checked/unchecked/indeterminate

**Component Structure**:
```typescript
<Checkbox checked={boolean} onCheckedChange={fn}>
  <CheckboxIndicator />
</Checkbox>
```

**Props Interface**:
```typescript
interface CheckboxProps {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  required?: boolean
  children?: any
  className?: string
}
```

**Data Attributes**:
- `data-state="checked" | "unchecked" | "indeterminate"`
- `data-disabled`

### 17. Avatar Component (Headless)

**Responsabilidade**: Avatar com fallback

**Component Structure**:
```typescript
<Avatar>
  <AvatarImage src="..." alt="..." />
  <AvatarFallback>
    {/* Fallback quando imagem não carrega */}
  </AvatarFallback>
</Avatar>
```

**Props Interface**:
```typescript
interface AvatarProps {
  children: any
  className?: string
}

interface AvatarImageProps {
  src: string
  alt?: string
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void
}
```

**Data Attributes**:
- `data-state="loading" | "loaded" | "error"`

### 18. Badge Component (Headless)

**Responsabilidade**: Badge/tag para labels

**Component Structure**:
```typescript
<Badge variant="default">
  {/* Conteúdo */}
</Badge>
```

**Props Interface**:
```typescript
interface BadgeProps {
  variant?: string
  children: any
  className?: string
}
```

### 19. Card Component (Headless)

**Responsabilidade**: Container de card

**Component Structure**:
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

**Props Interface**:
```typescript
interface CardProps {
  children: any
  className?: string
}
```

### 20. Alert Component (Headless)

**Responsabilidade**: Mensagem de alerta

**Component Structure**:
```typescript
<Alert variant="default">
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

**Props Interface**:
```typescript
interface AlertProps {
  variant?: 'default' | 'destructive'
  children: any
  className?: string
}
```

**Data Attributes**:
- `data-variant="default" | "destructive"`

### 21. AspectRatio Component (Headless)

**Responsabilidade**: Container com aspect ratio fixo

**Component Structure**:
```typescript
<AspectRatio ratio={16/9}>
  {/* Conteúdo */}
</AspectRatio>
```

**Props Interface**:
```typescript
interface AspectRatioProps {
  ratio?: number
  children: any
  className?: string
}
```

### 22. Collapsible Component (Headless)

**Responsabilidade**: Conteúdo colapsável

**Component Structure**:
```typescript
<Collapsible open={boolean} onOpenChange={fn}>
  <CollapsibleTrigger>
    {/* Botão para expandir/colapsar */}
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Conteúdo colapsável */}
  </CollapsibleContent>
</Collapsible>
```

**Props Interface**:
```typescript
interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children: any
}
```

**Data Attributes**:
- `data-state="open" | "closed"`
- `data-disabled`

### 23. Command Component (Headless)

**Responsabilidade**: Command palette/search

**Component Structure**:
```typescript
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Item 1</CommandItem>
      <CommandItem>Item 2</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

**Props Interface**:
```typescript
interface CommandProps {
  value?: string
  onValueChange?: (value: string) => void
  filter?: (value: string, search: string) => number
  children: any
}
```

### 24. HoverCard Component (Headless)

**Responsabilidade**: Card que aparece ao hover

**Component Structure**:
```typescript
<HoverCard openDelay={200}>
  <HoverCardTrigger>
    {/* Elemento que dispara hover */}
  </HoverCardTrigger>
  <HoverCardContent>
    {/* Conteúdo do card */}
  </HoverCardContent>
</HoverCard>
```

**Props Interface**:
```typescript
interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
  children: any
}
```

### 25. Menubar Component (Headless)

**Responsabilidade**: Barra de menu (tipo menu de aplicativo)

**Component Structure**:
```typescript
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Exit</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### 26. NavigationMenu Component (Headless)

**Responsabilidade**: Menu de navegação

**Component Structure**:
```typescript
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Conteúdo */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### 27. Resizable Component (Headless)

**Responsabilidade**: Painéis redimensionáveis

**Component Structure**:
```typescript
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    {/* Painel 1 */}
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    {/* Painel 2 */}
  </ResizablePanel>
</ResizablePanelGroup>
```

### 28. Sheet Component (Headless)

**Responsabilidade**: Painel lateral (drawer)

**Component Structure**:
```typescript
<Sheet open={boolean} onOpenChange={fn}>
  <SheetTrigger>
    {/* Botão que abre sheet */}
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    {/* Conteúdo */}
    <SheetFooter>
      {/* Footer */}
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Props Interface**:
```typescript
interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: any
}

interface SheetContentProps {
  side?: 'top' | 'right' | 'bottom' | 'left'
  children: any
  className?: string
}
```

**Data Attributes**:
- `data-state="open" | "closed"`
- `data-side="top" | "right" | "bottom" | "left"`

### 29. Skeleton Component (Headless)

**Responsabilidade**: Placeholder para loading

**Component Structure**:
```typescript
<Skeleton className="w-full h-20" />
```

**Props Interface**:
```typescript
interface SkeletonProps {
  className?: string
}
```

### 30. Toast Component (Headless)

**Responsabilidade**: Notificações toast

**Component Structure**:
```typescript
<ToastProvider>
  <Toast open={boolean} onOpenChange={fn}>
    <ToastTitle>Title</ToastTitle>
    <ToastDescription>Description</ToastDescription>
    <ToastAction altText="Action">Action</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>
```

**Props Interface**:
```typescript
interface ToastProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
  children: any
}
```

### 31. Composite Components

Componentes compostos que combinam primitivas com lógica de serviços Astal:

#### Workspaces Component (Hyprland)

**Responsabilidade**: Exibir e gerenciar workspaces do Hyprland

**Component Structure**:
```typescript
// Versão simples com render prop
<Workspaces>
  {({ workspaces, activeWorkspace, focusWorkspace }) => (
    <box>
      {workspaces.map(ws => (
        <button 
          onClick={() => focusWorkspace(ws.id)}
          data-active={ws.id === activeWorkspace?.id}
        >
          {ws.id}
        </button>
      ))}
    </box>
  )}
</Workspaces>

// Versão com componentes prontos
<Workspaces>
  <WorkspaceList>
    {(workspace) => (
      <WorkspaceButton workspace={workspace}>
        {workspace.id}
      </WorkspaceButton>
    )}
  </WorkspaceList>
</Workspaces>
```

**Props Interface**:
```typescript
interface WorkspacesProps {
  // Filtrar workspaces exibidos
  filter?: (workspace: Workspace) => boolean
  // Ordenação customizada
  sort?: (a: Workspace, b: Workspace) => number
  // Mostrar apenas workspaces com janelas
  showOnlyOccupied?: boolean
  // Mostrar workspaces vazios
  showEmpty?: boolean
  // Número de workspaces a exibir
  count?: number
  // Render prop
  children: (state: WorkspacesState) => JSX.Element
}

interface WorkspacesState {
  workspaces: Workspace[]
  activeWorkspace: Workspace | null
  focusWorkspace: (id: number) => void
}

interface Workspace {
  id: number
  name: string
  windows: number
  monitor: string
}
```

**Features**:
- Auto-atualização quando workspaces mudam
- Suporte a múltiplos monitores
- Indicador de workspace ativo
- Indicador de workspaces com janelas
- Drag & drop para mover janelas (opcional)

#### Windows Component (Hyprland)

**Responsabilidade**: Exibir e gerenciar janelas abertas

**Component Structure**:
```typescript
<Windows>
  {({ windows, activeWindow, focusWindow, closeWindow }) => (
    <box>
      {windows.map(win => (
        <button 
          onClick={() => focusWindow(win.address)}
          data-active={win.address === activeWindow?.address}
        >
          <icon name={win.class} />
          <label label={win.title} />
          <button onClick={() => closeWindow(win.address)}>×</button>
        </button>
      ))}
    </box>
  )}
</Windows>
```

**Props Interface**:
```typescript
interface WindowsProps {
  // Filtrar por workspace
  workspace?: number
  // Filtrar por monitor
  monitor?: string
  // Mostrar apenas janelas do workspace ativo
  activeWorkspaceOnly?: boolean
  // Limite de janelas
  limit?: number
  // Render prop
  children: (state: WindowsState) => JSX.Element
}

interface WindowsState {
  windows: Window[]
  activeWindow: Window | null
  focusWindow: (address: string) => void
  closeWindow: (address: string) => void
  minimizeWindow: (address: string) => void
  maximizeWindow: (address: string) => void
}

interface Window {
  address: string
  title: string
  class: string
  workspace: number
  monitor: string
  fullscreen: boolean
  floating: boolean
}
```

#### BatteryIndicator
```typescript
<BatteryIndicator>
  {({ percentage, charging, timeRemaining, available }) => (
    <box>
      <icon name={getIcon(percentage, charging)} />
      <label label={`${percentage}%`} />
      {timeRemaining && <label label={formatTime(timeRemaining)} />}
    </box>
  )}
</BatteryIndicator>
```

**Props Interface**:
```typescript
interface BatteryIndicatorProps {
  // Mostrar porcentagem
  showPercentage?: boolean
  // Mostrar tempo restante
  showTimeRemaining?: boolean
  // Nível crítico para alerta
  criticalLevel?: number
  // Render prop
  children: (state: BatteryState) => JSX.Element
}
```

#### NetworkIndicator
```typescript
<NetworkIndicator>
  {({ wifi, wired, connectToNetwork }) => (
    <box>
      {wifi.enabled && (
        <>
          <icon name={getSignalIcon(wifi.strength)} />
          <label label={wifi.ssid} />
        </>
      )}
      {wired.connected && (
        <icon name="network-wired" />
      )}
    </box>
  )}
</NetworkIndicator>
```

**Props Interface**:
```typescript
interface NetworkIndicatorProps {
  // Mostrar nome da rede
  showSSID?: boolean
  // Mostrar velocidade
  showSpeed?: boolean
  // Render prop
  children: (state: NetworkState) => JSX.Element
}
```

#### VolumeControl
```typescript
<VolumeControl>
  {({ volume, muted, setVolume, toggleMute }) => (
    <box>
      <button onClick={toggleMute}>
        <icon name={muted ? 'audio-volume-muted' : 'audio-volume-high'} />
      </button>
      <Slider 
        value={volume} 
        onValueChange={setVolume}
        min={0}
        max={100}
      />
      <label label={`${Math.round(volume)}%`} />
    </box>
  )}
</VolumeControl>
```

**Props Interface**:
```typescript
interface VolumeControlProps {
  // Dispositivo (speaker ou microphone)
  device?: 'speaker' | 'microphone'
  // Mostrar porcentagem
  showPercentage?: boolean
  // Render prop
  children: (state: VolumeState) => JSX.Element
}
```

#### MediaPlayer
```typescript
<MediaPlayer>
  {({ metadata, status, play, pause, next, previous }) => (
    <box>
      <image src={metadata.artUrl} />
      <box orientation="vertical">
        <label label={metadata.title} />
        <label label={metadata.artist} />
      </box>
      <box>
        <button onClick={previous}>⏮</button>
        <button onClick={status === 'playing' ? pause : play}>
          {status === 'playing' ? '⏸' : '▶'}
        </button>
        <button onClick={next}>⏭</button>
      </box>
    </box>
  )}
</MediaPlayer>
```

**Props Interface**:
```typescript
interface MediaPlayerProps {
  // Player preferido
  preferredPlayer?: string
  // Mostrar apenas quando player ativo
  showOnlyWhenActive?: boolean
  // Render prop
  children: (state: MediaPlayerState) => JSX.Element
}

interface MediaPlayerState {
  metadata: MediaMetadata
  status: 'playing' | 'paused' | 'stopped'
  position: number
  length: number
  play: () => void
  pause: () => void
  next: () => void
  previous: () => void
  seek: (position: number) => void
}
```

#### NotificationPopup
```typescript
<NotificationPopup>
  {({ notification, dismiss, invokeAction }) => (
    <box>
      <image src={notification.icon} />
      <box orientation="vertical">
        <label label={notification.summary} />
        <label label={notification.body} />
        <box>
          {notification.actions.map(action => (
            <button onClick={() => invokeAction(action.id)}>
              {action.label}
            </button>
          ))}
        </box>
      </box>
      <button onClick={dismiss}>×</button>
    </box>
  )}
</NotificationPopup>
```

**Props Interface**:
```typescript
interface NotificationPopupProps {
  // Posição na tela
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  // Duração antes de auto-dismiss (ms)
  timeout?: number
  // Máximo de notificações simultâneas
  maxVisible?: number
  // Render prop
  children: (state: NotificationState) => JSX.Element
}
```

#### SystemTray
```typescript
<SystemTray>
  {({ items }) => (
    <box>
      {items.map(item => (
        <button onClick={() => item.activate()}>
          <image pixbuf={item.icon} />
        </button>
      ))}
    </box>
  )}
</SystemTray>
```

**Props Interface**:
```typescript
interface SystemTrayProps {
  // Tamanho dos ícones
  iconSize?: number
  // Filtrar itens
  filter?: (item: TrayItem) => boolean
  // Render prop
  children: (state: SystemTrayState) => JSX.Element
}

interface SystemTrayState {
  items: TrayItem[]
}

interface TrayItem {
  id: string
  title: string
  icon: any
  activate: () => void
  secondaryActivate: () => void
  menu: any
}
```

#### Clock
```typescript
<Clock format="HH:mm">
  {({ time, date }) => (
    <box orientation="vertical">
      <label label={time} />
      <label label={date} />
    </box>
  )}
</Clock>
```

**Props Interface**:
```typescript
interface ClockProps {
  // Formato de tempo (usando date-fns ou similar)
  format?: string
  // Intervalo de atualização (ms)
  interval?: number
  // Locale
  locale?: string
  // Render prop
  children: (state: ClockState) => JSX.Element
}

interface ClockState {
  time: string
  date: string
  timestamp: Date
}
```

#### AppLauncher
```typescript
<AppLauncher>
  {({ apps, query, setQuery, launchApp }) => (
    <box orientation="vertical">
      <Input 
        value={query} 
        onValueChange={setQuery}
        placeholder="Search apps..."
      />
      <ScrollArea>
        {apps.map(app => (
          <button onClick={() => launchApp(app)}>
            <image src={app.icon} />
            <box orientation="vertical">
              <label label={app.name} />
              <label label={app.description} />
            </box>
          </button>
        ))}
      </ScrollArea>
    </box>
  )}
</AppLauncher>
```

**Props Interface**:
```typescript
interface AppLauncherProps {
  // Máximo de resultados
  maxResults?: number
  // Categorias a incluir
  categories?: string[]
  // Mostrar apps frequentes primeiro
  sortByFrequency?: boolean
  // Render prop
  children: (state: AppLauncherState) => JSX.Element
}

interface AppLauncherState {
  apps: Application[]
  query: string
  setQuery: (query: string) => void
  launchApp: (app: Application) => void
  frequentApps: Application[]
  recentApps: Application[]
}
```

#### OSD (On-Screen Display)

**Responsabilidade**: Exibir feedback visual temporário para mudanças de sistema

**Component Structure**:
```typescript
// OSD genérico
<OSD 
  value={number} 
  icon={string}
  visible={boolean}
  timeout={2000}
>
  {({ value, icon, progress }) => (
    <box orientation="vertical">
      <icon name={icon} />
      <Progress value={progress} max={100} />
      <label label={`${value}%`} />
    </box>
  )}
</OSD>

// OSD específicos prontos
<VolumeOSD />
<BrightnessOSD />
<MicrophoneOSD />
<KeyboardBacklightOSD />
```

**Props Interface**:
```typescript
interface OSDProps {
  // Valor atual (0-100)
  value?: number
  // Ícone a exibir
  icon?: string
  // Visibilidade
  visible?: boolean
  // Tempo antes de esconder (ms)
  timeout?: number
  // Posição na tela
  position?: 'center' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  // Animação de entrada/saída
  animation?: 'fade' | 'slide' | 'scale'
  // Render prop
  children?: (state: OSDState) => JSX.Element
}

interface OSDState {
  value: number
  icon: string
  progress: number
  visible: boolean
}
```

**OSD Específicos**:

```typescript
// Volume OSD - auto-detecta mudanças de volume
<VolumeOSD position="center">
  {({ volume, muted, icon }) => (
    <box>
      <icon name={icon} />
      <Progress value={volume} max={100} />
      <label label={muted ? 'Muted' : `${volume}%`} />
    </box>
  )}
</VolumeOSD>

// Brightness OSD - auto-detecta mudanças de brilho
<BrightnessOSD position="center">
  {({ brightness, icon }) => (
    <box>
      <icon name={icon} />
      <Progress value={brightness} max={100} />
      <label label={`${brightness}%`} />
    </box>
  )}
</BrightnessOSD>

// Microphone OSD
<MicrophoneOSD position="center">
  {({ volume, muted, icon }) => (
    <box>
      <icon name={icon} />
      <Progress value={volume} max={100} />
      <label label={muted ? 'Muted' : `${volume}%`} />
    </box>
  )}
</MicrophoneOSD>

// Keyboard Backlight OSD
<KeyboardBacklightOSD position="center">
  {({ brightness, icon }) => (
    <box>
      <icon name={icon} />
      <Progress value={brightness} max={100} />
      <label label={`${brightness}%`} />
    </box>
  )}
</KeyboardBacklightOSD>
```

**Features do OSD**:
- Auto-hide após timeout configurável
- Animações de entrada/saída
- Posicionamento flexível
- Detecção automática de mudanças (para OSDs específicos)
- Debounce para evitar múltiplas exibições
- Suporte a ícones dinâmicos (ex: volume muted vs unmuted)
- Customização total via render prop

**Props dos OSDs Específicos**:
```typescript
interface VolumeOSDProps {
  // Dispositivo (speaker ou microphone)
  device?: 'speaker' | 'microphone'
  // Posição
  position?: OSDPosition
  // Timeout
  timeout?: number
  // Mostrar apenas quando mudar
  showOnChange?: boolean
  // Render prop
  children?: (state: VolumeOSDState) => JSX.Element
}

interface BrightnessOSDProps {
  // Posição
  position?: OSDPosition
  // Timeout
  timeout?: number
  // Mostrar apenas quando mudar
  showOnChange?: boolean
  // Render prop
  children?: (state: BrightnessOSDState) => JSX.Element
}
```

**Implementation Notes**:
- OSDs específicos usam hooks (useAudio, useBrightness) internamente
- Detectam mudanças automaticamente e exibem OSD
- Debounce de 100ms para evitar spam
- Fade out suave após timeout
- Podem ser usados standalone ou integrados em window manager

## Hooks Design

### useBattery Hook

**Responsabilidade**: Fornecer dados reativos de bateria

**Interface**:
```typescript
interface BatteryState {
  percentage: number
  charging: boolean
  timeRemaining: number | null
  available: boolean
}

function useBattery(): BatteryState
```

**Implementation**:
- Usa `createBinding` do gnim com AstalBattery
- Retorna objeto reativo
- Lida com caso onde bateria não está disponível

### useNetwork Hook

**Responsabilidade**: Fornecer dados reativos de rede

**Interface**:
```typescript
interface NetworkState {
  wifi: {
    enabled: boolean
    connected: boolean
    ssid: string | null
    strength: number
    accessPoints: AccessPoint[]
  }
  wired: {
    connected: boolean
  }
}

interface AccessPoint {
  ssid: string
  strength: number
  secure: boolean
  active: boolean
}

function useNetwork(): NetworkState
```

**Implementation**:
- Usa `createBinding` com AstalNetwork
- Expõe lista de access points
- Fornece métodos para conectar/desconectar

### useAudio Hook

**Responsabilidade**: Fornecer controle reativo de áudio

**Interface**:
```typescript
interface AudioState {
  speaker: {
    volume: number
    muted: boolean
  }
  microphone: {
    volume: number
    muted: boolean
  }
  setVolume: (device: 'speaker' | 'microphone', volume: number) => void
  toggleMute: (device: 'speaker' | 'microphone') => void
}

function useAudio(): AudioState
```

**Implementation**:
- Usa AstalWp (WirePlumber)
- Bindings bidirecionais para volume
- Métodos para controle

### useHyprland Hook

**Responsabilidade**: Fornecer dados reativos do Hyprland

**Interface**:
```typescript
interface HyprlandState {
  workspaces: Workspace[]
  activeWorkspace: Workspace | null
  windows: Window[]
  activeWindow: Window | null
  focusWorkspace: (id: number) => void
}

interface Workspace {
  id: number
  name: string
  windows: number
}

function useHyprland(): HyprlandState
```

**Implementation**:
- Usa AstalHyprland
- Bindings para workspaces e janelas
- Métodos para navegação

### useNotifications Hook

**Responsabilidade**: Fornecer gerenciamento de notificações

**Interface**:
```typescript
interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  dismiss: (id: number) => void
  dismissAll: () => void
}

interface Notification {
  id: number
  appName: string
  summary: string
  body: string
  icon: string
  actions: NotificationAction[]
  timestamp: Date
}

function useNotifications(): NotificationsState
```

**Implementation**:
- Usa AstalNotifd
- Lista reativa de notificações
- Métodos para gerenciamento

## Utilities Design

### Format Utilities

```typescript
// Formatação de tempo
function formatTime(date: Date, format?: string): string

// Formatação de bytes
function formatBytes(bytes: number, decimals?: number): string

// Formatação de porcentagem
function formatPercentage(value: number, total: number): string

// Formatação de duração
function formatDuration(seconds: number): string
```

### Performance Utilities

```typescript
// Debounce
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void

// Throttle
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void
```

### Class Utilities

```typescript
// Composição de classes CSS
function clsx(...classes: (string | undefined | null | false)[]): string
```

## Primitives Design

### Context Helper

```typescript
function createContext<T>(name: string) {
  const Context = createSignal<T | null>(null)
  
  function Provider(props: { value: T; children: any }) {
    // Implementação
  }
  
  function useContext() {
    const context = Context()
    if (!context) {
      throw new Error(`${name} must be used within ${name}.Provider`)
    }
    return context
  }
  
  return [Provider, useContext] as const
}
```

### Binding Helper

```typescript
function createReactiveBinding<T extends GObject.Object, K extends keyof T>(
  object: T,
  property: K
) {
  return createBinding(object, property as string)
}
```

## Error Handling

### Service Availability

```typescript
// Verificar disponibilidade de serviços
function checkServiceAvailability(serviceName: string): boolean {
  try {
    const service = getService(serviceName)
    return service !== null
  } catch {
    return false
  }
}

// Wrapper para hooks com fallback
function createSafeHook<T>(
  hookFn: () => T,
  fallback: T
): () => T {
  return () => {
    try {
      return hookFn()
    } catch (error) {
      console.warn(`Hook failed, using fallback:`, error)
      return fallback
    }
  }
}
```

### Graceful Degradation

- Hooks retornam valores padrão quando serviços não estão disponíveis
- Componentes renderizam estado "unavailable" quando apropriado
- Erros são logados mas não quebram a aplicação

## Testing Strategy

### Unit Testing

- Testar lógica de estado de componentes
- Testar funções de formatação e utilitários
- Testar hooks com mocks de serviços Astal
- Usar vitest para testes

### Integration Testing

- Testar composição de componentes
- Testar interação entre hooks e componentes
- Testar bindings reativos

### Manual Testing

- Criar exemplos de uso para cada componente
- Testar em ambiente AGS real
- Verificar performance e memory leaks

## Implementation Notes

### Controlled vs Uncontrolled

Todos os componentes com estado suportam ambos os padrões:

```typescript
// Controlled
<Slider value={value} onValueChange={setValue} />

// Uncontrolled
<Slider defaultValue={50} />
```

### Composition Pattern

Componentes seguem padrão de composição do Radix:

```typescript
// Primitivas compostas
<Popover>
  <PopoverTrigger />
  <PopoverContent />
</Popover>

// Não monolítico
<Popover trigger={...} content={...} /> // ❌ Evitar
```

### Render Props

Componentes de dados usam render props para máxima flexibilidade:

```typescript
<BatteryIndicator>
  {(battery) => (
    // Renderização customizada
  )}
</BatteryIndicator>
```

### Data Attributes

Estados expostos via data attributes para estilização CSS:

```css
[data-state="open"] { /* ... */ }
[data-disabled] { /* ... */ }
[data-orientation="vertical"] { /* ... */ }
```

### TypeScript Patterns

```typescript
// Props com children tipados
interface ComponentProps {
  children: (state: State) => JSX.Element
}

// Props com asChild
interface TriggerProps {
  asChild?: boolean
  children: JSX.Element
}

// Discriminated unions para estados
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error }
```

### Performance Optimization

- Usar `createMemo` para valores derivados
- Evitar re-renders desnecessários
- Lazy loading de serviços pesados
- Debounce em eventos frequentes

### Accessibility

- Expor estados via data attributes
- Suportar navegação por teclado
- Fornecer props para ARIA attributes
- Documentar requisitos de acessibilidade
