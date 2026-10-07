import test from 'node:test';import assert from 'node:assert/strict';import{membershipStatus}from'../server/domain/membership-status.mjs';
const now=Date.parse('2026-10-08T12:00:00Z');
test('expired when end date is before today',()=>assert.equal(membershipStatus('2026-10-07',7,now),'EXPIRED'));
test('expiring at seven day boundary',()=>assert.equal(membershipStatus('2026-10-15',7,now),'EXPIRING'));
test('active after warning window',()=>assert.equal(membershipStatus('2026-10-16',7,now),'ACTIVE'));
