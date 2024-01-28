import { assign, setup } from 'xstate';

export const callStateMachine = setup({
	types: {} as {
		context: {
			concept: string | null;
			currentLevel: string | null;
			targetLevel: string | null;
			endDate: string | null;
			estimatedEndDate: string | null;
		};
		events:
			| { type: 'concept.ok'; concept: string }
			| { type: 'currentLevel.ok'; currentLevel: string }
			| { type: 'targetLevel.ok'; targetLevel: string }
			| { type: 'endDate.realistic'; endDate: string }
			| { type: 'endDate.unrealistic'; endDate: string; estimatedEndDate: string }
			| { type: 'estimatedDate.accepted'; endDate: string }
			| { type: 'estimatedDate.rejected' }
			| { type: 'create.confirm' }
			| { type: 'create.rejected' };
	}
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QGMCGAbdBlALqnYAdMgPYB2yYADjgMSkXU6EkDWA2gAwC6ioVJWAEscQ8nxAAPRAEYAbJ0IBWJQBY5ADgBMATk4B2AMw7VGgDQgAnokOG5hOXpky7Sl6tWGlAX28W0mLj4RMgArgBO4WBkOAAyYABuYOj0EVEx8UnoLBw8EgLCouJIUoiqSopy+jr68hqcWkpazRbWCF46DnLdGho6XjKcavq+-hjYeASEeOEwcYnJtDNzmck5XLwlBSJiZBLSCPpyhg4y+lrGcoMy-UqtNkqd3T19A0OqI34gARPBhNEQAAiwVoAOBUyiGCEsFEyA2+UEO2KoAOg3UhFMHlsGhkTRUWnuCC0nBkhEanAp6k4qhkpiMo2+4yCUzBINZU1CZEh6GhsPhW0RRT2JVR1PsmM8hhxeKahLs9k4GlsUpxg2anEMDJ+zKIqGQlBoAFEYUIALbBIFsk3mgiWqZ6g22-n8QW7faydRaQjOIyNHRVfRKORy5qECnh1T9M5aORaLVMya6-VMY2iG2QcFgUHWi2ZwhRABWYGQTryAsKbpFHtj3rOhj9AaDcvOynDQyUGk0OIu8cCieIkII9EHIXIADMhOFTc6QNshe6EDIcapCLVBlcl+p9CHKhVKXJTAZFb3flNkCPh2A-oXi6XNi6K8jSoulPXCBpHm4dP6YwZCTjWwjIYNE8Fw5F8L4yBICA4AkbVEwRR9hRRRAAFpgysNClEIb9vzcTQSXrM5AxPHViHIR1EKRZDn1UAlMPaJowyVQwaQpRxaSUT4xj7P4wkiaJ5iyKj5yrdohm9clVEVQMFGMOUFG9Z4cUcZpzn9Uj+2WMAhOSETKxQhBY30Mk6K0cpX2cQY7gYuxFHkHp5B0NTdHAr54L+dkwH0p8DijMNwy0D9TCCq4FPs5SnJcjT3ITP4HRTHNbUzHyaNRRpSQ1FwVEMfR1FsVQFPsDtlV6ZwGmJTVYt4s8R1ShczlpDF1QafQNVMQwd29PdqU7WNBjyzS+PQQRvPLaiGp0bQyTkLjZrwnQgwwtpDCXHC230YKTE2iDvCAA */
	id: 'callState',
	context: {
		concept: null,
		currentLevel: null,
		targetLevel: null,
		endDate: null,
		estimatedEndDate: null
	},
	initial: 'concept',
	states: {
		concept: {
			on: {
				'concept.ok': {
					target: 'currentLevel',
					actions: assign({
						concept: ({ event }) => event.concept
					})
				}
			}
		},
		currentLevel: {
			on: {
				'currentLevel.ok': {
					target: 'targetLevel',
					actions: assign({
						currentLevel: ({ event }) => event.currentLevel
					})
				}
			}
		},
		targetLevel: {
			on: {
				'targetLevel.ok': {
					target: 'endDate',
					actions: assign({
						targetLevel: ({ event }) => event.targetLevel
					})
				}
			}
		},
		endDate: {
			on: {
				'endDate.realistic': {
					target: 'create',
					actions: assign({
						endDate: ({ event }) => event.endDate
					})
				},
				'endDate.unrealistic': {
					target: 'acceptEstimatedDate',
					actions: assign({
						endDate: ({ event }) => event.endDate,
						estimatedEndDate: ({ event }) => event.estimatedEndDate
					})
				}
			}
		},
		acceptEstimatedDate: {
			on: {
				'estimatedDate.accepted': {
					target: 'create',
					actions: assign({
						endDate: ({ event }) => event.endDate
					})
				},
				'estimatedDate.rejected': {
					target: 'create'
				}
			}
		},
		create: {
			on: {
				'create.confirm': {
					target: 'close'
				},
				'create.rejected': {
					target: 'concept'
				}
			}
		},
		close: {
			type: 'final'
		}
	}
});
