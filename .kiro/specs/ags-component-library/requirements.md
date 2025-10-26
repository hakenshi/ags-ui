# Requirements Document

## Introduction

Este documento define os requisitos para a criação de uma biblioteca de componentes **headless** (sem UI) para AGS/Astal/gnim, inspirada no Radix UI. O objetivo é abstrair a complexidade do framework e fornecer componentes com lógica e comportamento prontos, mas completamente estilizáveis pelo desenvolvedor. A biblioteca fornece apenas a implementação funcional, deixando 100% da aparência visual para o usuário customizar.

## Glossary

- **Component Library**: Biblioteca de componentes reutilizáveis para AGS
- **AGS**: Aylur's GTK Shell, framework para criar widgets GTK
- **Astal**: Conjunto de bibliotecas GObject para serviços do sistema
- **gnim**: Biblioteca de reatividade para bindings
- **Widget**: Componente visual individual (botão, slider, etc)
- **Composite Component**: Componente complexo composto por múltiplos widgets
- **Theme System**: Sistema de temas e estilos customizáveis
- **Props Interface**: Interface de propriedades para configuração de componentes

## Requirements

### Requirement 1

**User Story:** Como desenvolvedor, eu quero componentes headless com lógica pronta, para que eu possa construir interfaces customizadas sem reimplementar comportamentos complexos

#### Acceptance Criteria

1. THE Component Library SHALL fornecer componentes sem estilos pré-definidos
2. THE Component Library SHALL expor toda a lógica de estado e comportamento via props
3. THE Component Library SHALL permitir customização completa via children e render props
4. THE Component Library SHALL fornecer classes de estado (active, disabled, etc) mas não estilos visuais
5. THE Component Library SHALL ser agnóstico de tema e aparência visual

### Requirement 2

**User Story:** Como desenvolvedor, eu quero um componente de menu popover reutilizável, para que eu possa criar menus dropdown facilmente

#### Acceptance Criteria

1. THE Component Library SHALL fornecer componente PopoverMenu que aceita botão customizável
2. WHEN o usuário clica no botão, THE PopoverMenu SHALL exibir o conteúdo do popover
3. THE PopoverMenu SHALL aceitar children como conteúdo do menu
4. THE PopoverMenu SHALL suportar posicionamento configurável (top, bottom, left, right)
5. WHEN o usuário clica fora do popover, THE PopoverMenu SHALL fechar automaticamente

### Requirement 3

**User Story:** Como desenvolvedor, eu quero componentes prontos para informações do sistema, para que eu não precise reimplementar lógica de polling e formatação

#### Acceptance Criteria

1. THE Component Library SHALL fornecer componente Clock com formatação customizável
2. THE Component Library SHALL fornecer componente Battery com ícone e porcentagem
3. THE Component Library SHALL fornecer componente NetworkIndicator com ícone de sinal
4. THE Component Library SHALL fornecer componente VolumeSlider com controle de áudio
5. THE Component Library SHALL fornecer componente WorkspaceIndicator para Hyprland
6. WHEN dados do sistema mudam, THE Component Library SHALL atualizar componentes automaticamente

### Requirement 4

**User Story:** Como desenvolvedor, eu quero controle total sobre estilos, para que eu possa criar qualquer aparência visual sem limitações

#### Acceptance Criteria

1. THE Component Library SHALL NOT incluir estilos CSS ou SCSS pré-definidos
2. THE Component Library SHALL aceitar props className ou cssName para estilização
3. THE Component Library SHALL expor estados via data attributes (data-state, data-disabled, etc)
4. THE Component Library SHALL permitir acesso a elementos internos via props asChild ou similar
5. THE Component Library SHALL fornecer apenas estrutura e comportamento, nunca aparência

### Requirement 5

**User Story:** Como desenvolvedor, eu quero componentes compostos prontos, para que eu possa criar barras e painéis complexos rapidamente

#### Acceptance Criteria

1. THE Component Library SHALL fornecer componente Bar com suporte a left, center, right sections
2. THE Component Library SHALL fornecer componente QuickSettings com controles de sistema
3. THE Component Library SHALL fornecer componente NotificationPopup para exibir notificações
4. THE Component Library SHALL fornecer componente MediaControls para players de mídia
5. THE Component Library SHALL fornecer componente AppLauncher com busca de aplicativos

### Requirement 6

**User Story:** Como desenvolvedor, eu quero hooks customizados para serviços Astal, para que eu possa acessar dados do sistema de forma reativa

#### Acceptance Criteria

1. THE Component Library SHALL fornecer hook useBattery para dados de bateria
2. THE Component Library SHALL fornecer hook useNetwork para dados de rede
3. THE Component Library SHALL fornecer hook useAudio para controle de áudio
4. THE Component Library SHALL fornecer hook useHyprland para workspaces e janelas
5. THE Component Library SHALL fornecer hook useNotifications para notificações
6. WHEN dados mudam, THE Component Library SHALL re-renderizar componentes automaticamente

### Requirement 7

**User Story:** Como desenvolvedor, eu quero utilitários para formatação e conversão, para que eu não precise reescrever funções comuns

#### Acceptance Criteria

1. THE Component Library SHALL fornecer função formatTime para formatação de data/hora
2. THE Component Library SHALL fornecer função formatBytes para tamanhos de arquivo
3. THE Component Library SHALL fornecer função formatPercentage para valores percentuais
4. THE Component Library SHALL fornecer função debounce para otimização de eventos
5. THE Component Library SHALL fornecer função throttle para limitação de chamadas
6. THE Component Library SHALL fornecer função clsx para composição de classes CSS

### Requirement 8

**User Story:** Como desenvolvedor, eu quero documentação clara e exemplos, para que eu possa aprender a usar a biblioteca rapidamente

#### Acceptance Criteria

1. THE Component Library SHALL incluir README com instruções de instalação
2. THE Component Library SHALL documentar cada componente com props, estados e comportamentos
3. THE Component Library SHALL fornecer exemplos unstyled mostrando apenas funcionalidade
4. THE Component Library SHALL fornecer exemplos styled mostrando possibilidades de customização
5. THE Component Library SHALL incluir exemplo completo de barra para Hyprland com estilos customizados

### Requirement 9

**User Story:** Como desenvolvedor, eu quero TypeScript types completos, para que eu tenha autocomplete e type safety

#### Acceptance Criteria

1. THE Component Library SHALL exportar interfaces TypeScript para todos os componentes
2. THE Component Library SHALL tipar props de componentes corretamente
3. THE Component Library SHALL tipar retornos de hooks customizados
4. THE Component Library SHALL fornecer types para eventos e callbacks
5. THE Component Library SHALL ser compatível com strict mode do TypeScript

### Requirement 10

**User Story:** Como desenvolvedor, eu quero uma API simples e consistente, para que eu possa usar componentes sem consultar documentação constantemente

#### Acceptance Criteria

1. THE Component Library SHALL usar convenções de nomenclatura consistentes
2. THE Component Library SHALL usar padrões de props similares ao React
3. THE Component Library SHALL fornecer valores padrão sensatos para props opcionais
4. THE Component Library SHALL usar composição ao invés de configuração complexa
5. THE Component Library SHALL manter API estável entre versões minor
